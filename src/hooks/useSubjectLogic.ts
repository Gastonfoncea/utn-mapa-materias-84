import { useState, useCallback, useMemo, useEffect } from 'react';
import { Subject } from '@/data/subjects';
import { SubjectStatus } from '@/components/SubjectNode';
import { useAuth } from './useAuth';
import { useSubjectDatabase } from './useSubjectDatabase';

// Tipos para el manejo de créditos de electivas
interface ElectiveCredits {
  year3: number; // necesarios: 4
  year4: number; // necesarios: 6  
  year5: number; // necesarios: 10
}

export function useSubjectLogic(initialSubjects: Subject[]) {
  const { user } = useAuth();
  const { loadSubjectStates, saveSubjectState, resetUserStates } = useSubjectDatabase(user?.id);
  
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [highlightedPrereqs, setHighlightedPrereqs] = useState<{id: number, type: 'regular' | 'approved'}[]>([]);
  const [specialSubjectClickCount, setSpecialSubjectClickCount] = useState<Record<number, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar estado inicial desde Supabase cuando el usuario se autentica
  useEffect(() => {
    const loadUserStates = async () => {
      if (user && !isLoaded) {
        const stateMap = await loadSubjectStates();
        if (stateMap) {
          const updatedSubjects = initialSubjects.map(subject => ({
            ...subject,
            status: stateMap[subject.id] || subject.status
          }));
          setSubjects(updatedSubjects);
        }
        setIsLoaded(true);
      } else if (!user && isLoaded) {
        // Si el usuario se desloguea, resetear al estado inicial
        setSubjects(initialSubjects);
        setIsLoaded(false);
      }
    };

    loadUserStates();
  }, [user, loadSubjectStates, initialSubjects, isLoaded]);

  // Calcular créditos de electivas
  const calculateElectiveCredits = useCallback((allSubjects: Subject[]): ElectiveCredits => {
    const credits = { year3: 0, year4: 0, year5: 0 };
    
    allSubjects.forEach(subject => {
      if (subject.electiva && subject.status === 'approved') { // Solo créditos con electivas aprobadas
        if (subject.nivel === 3) {
          credits.year3 += 4;
        } else if (subject.nivel === 4) {
          credits.year4 += 3;
        } else if (subject.nivel === 5) {
          credits.year5 += 3;
        }
      }
    });
    
    return credits;
  }, []);

  // Función para verificar si una materia está habilitada para cursar
  const isSubjectAvailable = useCallback((subject: Subject, allSubjects: Subject[]) => {
    // Si no tiene correlativas, está disponible
    if (subject.correlativasRegular.length === 0 && subject.correlativasAprobada.length === 0) return true;
    
    // Verificar correlativas regulares (deben estar regulares o aprobadas para cursar)
    const regularsMet = subject.correlativasRegular.every(prereqId => {
      const prereq = allSubjects.find(s => s.id === prereqId);
      return prereq?.status === 'approved' || prereq?.status === 'regular';
    });
    
    // Verificar correlativas aprobadas (deben estar aprobadas para cursar)
    const approvedMet = subject.correlativasAprobada.every(prereqId => {
      const prereq = allSubjects.find(s => s.id === prereqId);
      return prereq?.status === 'approved';
    });
    
    return regularsMet && approvedMet;
  }, []);

  // Función para verificar si una materia está habilitada para rendir
  const isSubjectReadyToTest = useCallback((subject: Subject, allSubjects: Subject[]) => {
    // Si no tiene correlativas para rendir, puede rendir si puede cursar
    if (subject.correlativasRendir.length === 0) {
      return isSubjectAvailable(subject, allSubjects);
    }
    
    // Verificar todas las correlativas para rendir
    return subject.correlativasRendir.every(prereqId => {
      const prereq = allSubjects.find(s => s.id === prereqId);
      return prereq?.status === 'approved';
    });
  }, [isSubjectAvailable]);

  // Actualizar estados de materias basado en correlativas
  const updateSubjectStates = useCallback((updatedSubjects: Subject[]) => {
    const credits = calculateElectiveCredits(updatedSubjects);
    
    return updatedSubjects.map(subject => {
      // Mantener estados explícitos - agregar 'optional' a los estados que se mantienen
      if (subject.status === 'approved' || subject.status === 'current' || subject.status === 'regular' || subject.status === 'optional') {
        return subject; 
      }
      
      // Para electivas, verificar si ya se tienen suficientes créditos
      if (subject.electiva && subject.status !== 'elective-sufficient') {
        // Backend de Aplicaciones (id: 201) no puede ser opcional
        if (subject.id === 201) {
          const available = isSubjectAvailable(subject, updatedSubjects);
          return {
            ...subject,
            status: (available ? 'available' : 'locked') as SubjectStatus
          };
        }

        const hasEnoughCredits = 
          (subject.nivel === 3 && credits.year3 >= 4) ||
          (subject.nivel === 4 && credits.year4 >= 6) ||
          (subject.nivel === 5 && credits.year5 >= 10);
        
        if (hasEnoughCredits) {
          // Si ya se tienen suficientes créditos, cambiar automáticamente a opcional
          return { ...subject, status: 'optional' as SubjectStatus };
        }

        // Si no se tienen suficientes créditos pero está disponible, mantener como elective-sufficient
        const available = isSubjectAvailable(subject, updatedSubjects);
        if (available && subject.status === 'locked') {
          return { ...subject, status: 'available' as SubjectStatus };
        }
      }
      
      // Determinar si está disponible o bloqueada
      const available = isSubjectAvailable(subject, updatedSubjects);
      return {
        ...subject,
        status: (available ? 'available' : 'locked') as SubjectStatus
      };
    });
  }, [isSubjectAvailable, calculateElectiveCredits]);

  // Cambiar estado de una materia
  const updateSubjectStatus = useCallback((subjectId: number, newStatus: SubjectStatus) => {
    // Limpiar highlights al cambiar cualquier estado
    setHighlightedPrereqs([]);
    
    setSubjects(prevSubjects => {
      const updated = prevSubjects.map(subject => {
        if (subject.id === subjectId) {
          return { ...subject, status: newStatus };
        }
        return subject;
      });
      
      const finalSubjects = updateSubjectStates(updated);
      
      // Guardar en Supabase si hay usuario autenticado
      if (user) {
        saveSubjectState(subjectId, newStatus);
      }
      
      return finalSubjects;
    });
  }, [updateSubjectStates, user, saveSubjectState]);

  // Manejar click en materias especiales (Seminario y Proyecto Final)
  const handleSpecialSubjectClick = useCallback((subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    // Si ya hay prerrequisitos resaltados, limpiarlos
    if (highlightedPrereqs.length > 0) {
      setHighlightedPrereqs([]);
      return;
    }

    const currentCount = specialSubjectClickCount[subjectId] || 0;
    const newCount = currentCount + 1;
    
    setSpecialSubjectClickCount(prev => ({ ...prev, [subjectId]: newCount }));

    if (newCount % 2 === 1) {
      // Primer click: mostrar correlativas para cursar
      const regularPrereqs = subject.correlativasRegular.map(id => ({ id, type: 'regular' as const }));
      const approvedPrereqs = subject.correlativasAprobada.map(id => ({ id, type: 'approved' as const }));
      setHighlightedPrereqs([...regularPrereqs, ...approvedPrereqs]);
    } else {
      // Segundo click: mostrar correlativas para rendir
      const renderPrereqs = subject.correlativasRendir.map(id => ({ id, type: 'approved' as const }));
      setHighlightedPrereqs(renderPrereqs);
    }
  }, [subjects, specialSubjectClickCount, highlightedPrereqs]);

  // Manejar click en materias no disponibles
  const handleLockedSubjectClick = useCallback((subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    // Si ya hay prerrequisitos resaltados, limpiarlos
    if (highlightedPrereqs.length > 0) {
      setHighlightedPrereqs([]);
      return;
    }

    const regularPrereqs = subject.correlativasRegular.map(id => ({ id, type: 'regular' as const }));
    const approvedPrereqs = subject.correlativasAprobada.map(id => ({ id, type: 'approved' as const }));
    setHighlightedPrereqs([...regularPrereqs, ...approvedPrereqs]);
  }, [subjects, highlightedPrereqs]);

  // Ciclar entre estados disponibles al hacer clic
  const cycleSubjectStatus = useCallback((subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    // Materias bloqueadas (NO especiales) - mostrar correlativas
    if (subject.status === 'locked' && subject.correlativasRendir.length === 0) {
      handleLockedSubjectClick(subjectId);
      return;
    }

    // Materias especiales bloqueadas - NO hacer nada aquí, solo se maneja por el popover
    if (subject.status === 'locked' && subject.correlativasRendir.length > 0) {
      return; // No ejecutar nada, solo se abre el popover
    }

    // Limpiar highlights cuando se interactúa con materias normales
    if (highlightedPrereqs.length > 0) {
      setHighlightedPrereqs([]);
    }

    // Electivas con créditos suficientes
    if (subject.status === 'elective-sufficient') {
      updateSubjectStatus(subjectId, 'available');
      return;
    }

    // Ciclo normal de estados para materias disponibles
    const statusCycle: SubjectStatus[] = subject.electiva 
      ? ['available', 'current', 'regular', 'approved', 'optional']
      : ['available', 'current', 'regular', 'approved'];
    const currentIndex = statusCycle.indexOf(subject.status);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    const nextStatus = statusCycle[nextIndex];

    updateSubjectStatus(subjectId, nextStatus);
  }, [subjects, updateSubjectStatus, handleLockedSubjectClick, highlightedPrereqs]);

  // Reiniciar todas las materias
  const resetAllSubjects = useCallback(async () => {
    const resetSubjects = initialSubjects.map(subject => ({
      ...subject,
      status: (subject.correlativasRegular.length === 0 && subject.correlativasAprobada.length === 0 ? 'available' : 'locked') as SubjectStatus
    }));
    setSubjects(resetSubjects);
    setHighlightedPrereqs([]);
    setSpecialSubjectClickCount({});
    
    // Resetear en Supabase si hay usuario autenticado
    if (user) {
      await resetUserStates();
    }
  }, [initialSubjects, user, resetUserStates]);


  // Estadísticas
  const stats = useMemo(() => {
    const counts = subjects.reduce((acc, subject) => {
      acc[subject.status] = (acc[subject.status] || 0) + 1;
      return acc;
    }, {} as Record<SubjectStatus, number>);

    const credits = calculateElectiveCredits(subjects);
    
    // Verificar si se cumple para Analista o Ingeniero
    const seminarioIntegrador = subjects.find(s => s.id === 99);
    const proyectoFinal = subjects.find(s => s.id === 36);
    const isAnalista = seminarioIntegrador?.status === 'approved' && credits.year3 >= 4;
    const isIngeniero = proyectoFinal?.status === 'approved' && credits.year4 >= 6 && credits.year5 >= 10;

    return {
      approved: counts.approved || 0,
      current: counts.current || 0,
      regular: counts.regular || 0,
      available: counts.available || 0,
      locked: counts.locked || 0,
      'elective-sufficient': counts['elective-sufficient'] || 0,
      'optional': counts['optional'] || 0,
      total: subjects.length,
      electiveCredits: credits,
      isAnalista,
      isIngeniero
    };
  }, [subjects, calculateElectiveCredits]);

  // Manejar acciones especiales para materias con correlativas para rendir
  const handleSpecialAction = useCallback((subjectId: number, action: 'cursar' | 'rendir' | 'normal') => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    // Siempre limpiar highlights primero
    setHighlightedPrereqs([]);

    if (action === 'cursar') {
      // Mostrar correlativas para cursar
      const regularPrereqs = subject.correlativasRegular.map(id => ({ id, type: 'regular' as const }));
      const approvedPrereqs = subject.correlativasAprobada.map(id => ({ id, type: 'approved' as const }));
      setHighlightedPrereqs([...regularPrereqs, ...approvedPrereqs]);
    } else if (action === 'rendir') {
      // Mostrar correlativas para rendir
      const renderPrereqs = subject.correlativasRendir.map(id => ({ id, type: 'approved' as const }));
      setHighlightedPrereqs(renderPrereqs);
    }
    // Si action === 'normal', los highlights ya se limpiaron arriba
  }, [subjects]);

  // Función para limpiar highlights solamente
  const clearHighlights = useCallback(() => {
    setHighlightedPrereqs([]);
  }, []);

  return {
    subjects,
    cycleSubjectStatus,
    updateSubjectStatus,
    handleSpecialAction,
    clearHighlights,
    resetAllSubjects,
    stats,
    highlightedPrereqs,
    isSubjectReadyToTest
  };
}