import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Subject } from '@/data/subjects';
import { SubjectStatus } from '@/components/SubjectNode';

export function useSubjectDatabase() {
  // Cargar estados de materias del usuario
  const loadSubjectStates = useCallback(async (userId: string): Promise<Record<number, SubjectStatus> | null> => {
    try {
      const { data, error } = await supabase
        .from('subject_states')
        .select('subject_id, status')
        .eq('user_id', userId);

      if (error) {
        console.error('Error loading subject states:', error);
        return null;
      }

      const statesMap: Record<number, SubjectStatus> = {};
      data?.forEach(item => {
        statesMap[item.subject_id] = item.status as SubjectStatus;
      });

      return statesMap;
    } catch (error) {
      console.error('Error loading subject states:', error);
      return null;
    }
  }, []);

  // Guardar estado de una materia específica
  const saveSubjectState = useCallback(async (userId: string, subjectId: number, status: SubjectStatus): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('subject_states')
        .upsert({
          user_id: userId,
          subject_id: subjectId,
          status: status
        }, {
          onConflict: 'user_id,subject_id'
        });

      if (error) {
        console.error('Error saving subject state:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error saving subject state:', error);
      return false;
    }
  }, []);

  // Guardar todos los estados de materias
  const saveAllSubjectStates = useCallback(async (userId: string, subjects: Subject[]): Promise<boolean> => {
    try {
      const subjectStates = subjects
        .filter(subject => subject.status !== 'locked' && subject.status !== 'available') // Solo guardar estados explícitos
        .map(subject => ({
          user_id: userId,
          subject_id: subject.id,
          status: subject.status
        }));

      if (subjectStates.length === 0) {
        return true;
      }

      const { error } = await supabase
        .from('subject_states')
        .upsert(subjectStates, {
          onConflict: 'user_id,subject_id'
        });

      if (error) {
        console.error('Error saving all subject states:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error saving all subject states:', error);
      return false;
    }
  }, []);

  // Resetear todos los estados de materias del usuario
  const resetUserSubjectStates = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('subject_states')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('Error resetting subject states:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error resetting subject states:', error);
      return false;
    }
  }, []);

  return {
    loadSubjectStates,
    saveSubjectState,
    saveAllSubjectStates,
    resetUserSubjectStates
  };
}