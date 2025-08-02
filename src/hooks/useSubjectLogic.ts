import { useState, useCallback, useMemo } from 'react';
import { Subject } from '@/data/subjects';
import { SubjectStatus } from '@/components/SubjectNode';

// Tipos para el manejo de créditos de electivas
interface ElectiveCredits {
  year3: number; // necesarios: 4
  year4: number; // necesarios: 6  
  year5: number; // necesarios: 10
}

export function useSubjectLogic(initialSubjects: Subject[]) {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [highlightedPrereqs, setHighlightedPrereqs] = useState<number[]>([]);
  const [specialSubjectClickCount, setSpecialSubjectClickCount] = useState<Record<number, number>>({});

  // Calcular créditos de electivas
  const calculateElectiveCredits = useCallback((allSubjects: Subject[]): ElectiveCredits => {
    const credits = { year3: 0, year4: 0, year5: 0 };
    
    allSubjects.forEach(subject => {
      if (subject.electiva && (subject.status === 'approved' || subject.status === 'regular')) {
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
      if (subject.status === 'approved' || subject.status === 'failed' || subject.status === 'current' || subject.status === 'regular') {
        return subject; // Mantener estados explícitos
      }
      
      // Para electivas, verificar si ya se tienen suficientes créditos
      if (subject.electiva && subject.status !== 'elective-sufficient') {
        const hasEnoughCredits = 
          (subject.nivel === 3 && credits.year3 >= 4) ||
          (subject.nivel === 4 && credits.year4 >= 6) ||
          (subject.nivel === 5 && credits.year5 >= 10);
        
        if (hasEnoughCredits) {
          return { ...subject, status: 'elective-sufficient' as SubjectStatus };
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
    setSubjects(prevSubjects => {
      const updated = prevSubjects.map(subject => {
        if (subject.id === subjectId) {
          return { ...subject, status: newStatus };
        }
        return subject;
      });
      
      return updateSubjectStates(updated);
    });
    setHighlightedPrereqs([]); // Limpiar highlights
  }, [updateSubjectStates]);

  // Manejar click en materias especiales (Seminario y Proyecto Final)
  const handleSpecialSubjectClick = useCallback((subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    const currentCount = specialSubjectClickCount[subjectId] || 0;
    const newCount = currentCount + 1;
    
    setSpecialSubjectClickCount(prev => ({ ...prev, [subjectId]: newCount }));

    if (newCount % 2 === 1) {
      // Primer click: mostrar correlativas para cursar
      const prereqIds = [...subject.correlativasRegular, ...subject.correlativasAprobada];
      setHighlightedPrereqs(prereqIds);
    } else {
      // Segundo click: mostrar correlativas para rendir
      setHighlightedPrereqs(subject.correlativasRendir);
    }
  }, [subjects, specialSubjectClickCount]);

  // Manejar click en materias no disponibles
  const handleLockedSubjectClick = useCallback((subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    const prereqIds = [...subject.correlativasRegular, ...subject.correlativasAprobada];
    setHighlightedPrereqs(prereqIds);
  }, [subjects]);

  // Ciclar entre estados disponibles al hacer clic
  const cycleSubjectStatus = useCallback((subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    // Materias especiales con correlativasRendir
    if (subject.correlativasRendir.length > 0) {
      handleSpecialSubjectClick(subjectId);
      return;
    }

    // Materias bloqueadas
    if (subject.status === 'locked') {
      handleLockedSubjectClick(subjectId);
      return;
    }

    // Electivas con créditos suficientes (permitir cambiar estado si se quiere)
    if (subject.status === 'elective-sufficient') {
      updateSubjectStatus(subjectId, 'available');
      return;
    }

    // Ciclo normal de estados
    const statusCycle: SubjectStatus[] = ['available', 'current', 'regular', 'approved', 'failed'];
    const currentIndex = statusCycle.indexOf(subject.status);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    const nextStatus = statusCycle[nextIndex];

    updateSubjectStatus(subjectId, nextStatus);
  }, [subjects, updateSubjectStatus, handleSpecialSubjectClick, handleLockedSubjectClick]);

  // Reiniciar todas las materias
  const resetAllSubjects = useCallback(() => {
    const resetSubjects = initialSubjects.map(subject => ({
      ...subject,
      status: (subject.correlativasRegular.length === 0 && subject.correlativasAprobada.length === 0 ? 'available' : 'locked') as SubjectStatus
    }));
    setSubjects(resetSubjects);
    setHighlightedPrereqs([]);
    setSpecialSubjectClickCount({});
  }, [initialSubjects]);


  // Estadísticas
  const stats = useMemo(() => {
    const counts = subjects.reduce((acc, subject) => {
      acc[subject.status] = (acc[subject.status] || 0) + 1;
      return acc;
    }, {} as Record<SubjectStatus, number>);

    const credits = calculateElectiveCredits(subjects);

    return {
      approved: counts.approved || 0,
      current: counts.current || 0,
      regular: counts.regular || 0,
      failed: counts.failed || 0,
      available: counts.available || 0,
      locked: counts.locked || 0,
      total: subjects.length,
      electiveCredits: credits
    };
  }, [subjects, calculateElectiveCredits]);

  return {
    subjects,
    cycleSubjectStatus,
    resetAllSubjects,
    stats,
    highlightedPrereqs,
    isSubjectReadyToTest
  };
}