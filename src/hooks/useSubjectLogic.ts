import { useState, useCallback, useMemo } from 'react';
import { Subject } from '@/data/subjects';
import { SubjectStatus } from '@/components/SubjectNode';

export function useSubjectLogic(initialSubjects: Subject[]) {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  // Función para verificar si una materia está habilitada
  const isSubjectAvailable = useCallback((subject: Subject, allSubjects: Subject[]) => {
    // Si no tiene correlativas, está disponible
    if (subject.correlativasRegular.length === 0 && subject.correlativasAprobada.length === 0) return true;
    
    // Verificar correlativas regulares (deben estar aprobadas para cursar)
    const regularsMet = subject.correlativasRegular.every(prereqId => {
      const prereq = allSubjects.find(s => s.id === prereqId);
      return prereq?.status === 'approved';
    });
    
    // Verificar correlativas aprobadas (deben estar aprobadas para cursar)
    const approvedMet = subject.correlativasAprobada.every(prereqId => {
      const prereq = allSubjects.find(s => s.id === prereqId);
      return prereq?.status === 'approved';
    });
    
    return regularsMet && approvedMet;
  }, []);

  // Actualizar estados de materias basado en correlativas
  const updateSubjectStates = useCallback((updatedSubjects: Subject[]) => {
    return updatedSubjects.map(subject => {
      if (subject.status === 'approved' || subject.status === 'failed' || subject.status === 'current') {
        return subject; // Mantener estados explícitos
      }
      
      // Determinar si está disponible o bloqueada
      const available = isSubjectAvailable(subject, updatedSubjects);
      return {
        ...subject,
        status: (available ? 'available' : 'locked') as SubjectStatus
      };
    });
  }, [isSubjectAvailable]);

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
  }, [updateSubjectStates]);

  // Ciclar entre estados disponibles al hacer clic
  const cycleSubjectStatus = useCallback((subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject || subject.status === 'locked') return;

    const statusCycle: SubjectStatus[] = ['available', 'current', 'approved', 'failed'];
    const currentIndex = statusCycle.indexOf(subject.status);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    const nextStatus = statusCycle[nextIndex];

    updateSubjectStatus(subjectId, nextStatus);
  }, [subjects, updateSubjectStatus]);

  // Reiniciar todas las materias
  const resetAllSubjects = useCallback(() => {
    const resetSubjects = initialSubjects.map(subject => ({
      ...subject,
      status: (subject.correlativasRegular.length === 0 && subject.correlativasAprobada.length === 0 ? 'available' : 'locked') as SubjectStatus
    }));
    setSubjects(resetSubjects);
  }, [initialSubjects]);

  // Simular un cuatrimestre (aprobar materias en curso)
  const simulateSemester = useCallback(() => {
    setSubjects(prevSubjects => {
      const updated = prevSubjects.map(subject => {
        if (subject.status === 'current') {
          return { ...subject, status: 'approved' as SubjectStatus };
        }
        return subject;
      });
      
      return updateSubjectStates(updated);
    });
  }, [updateSubjectStates]);

  // Estadísticas
  const stats = useMemo(() => {
    const counts = subjects.reduce((acc, subject) => {
      acc[subject.status] = (acc[subject.status] || 0) + 1;
      return acc;
    }, {} as Record<SubjectStatus, number>);

    return {
      approved: counts.approved || 0,
      current: counts.current || 0,
      failed: counts.failed || 0,
      available: counts.available || 0,
      locked: counts.locked || 0,
      total: subjects.length
    };
  }, [subjects]);

  return {
    subjects,
    cycleSubjectStatus,
    resetAllSubjects,
    simulateSemester,
    stats
  };
}