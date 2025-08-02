import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Subject } from '@/data/subjects';
import { SubjectStatus } from '@/components/SubjectNode';
import { useAuth } from './useAuth';

export function useSubjectDatabase() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const loadSubjectStates = async (): Promise<Record<number, SubjectStatus>> => {
    if (!user) return {};
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('subject_states')
        .select('subject_id, status')
        .eq('user_id', user.id);

      if (error) throw error;

      const stateMap: Record<number, SubjectStatus> = {};
      data?.forEach(item => {
        stateMap[item.subject_id] = item.status as SubjectStatus;
      });

      return stateMap;
    } catch (error) {
      console.error('Error loading subject states:', error);
      return {};
    } finally {
      setLoading(false);
    }
  };

  const saveSubjectState = async (subjectId: number, status: SubjectStatus) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('subject_states')
        .upsert({
          user_id: user.id,
          subject_id: subjectId,
          status
        }, {
          onConflict: 'user_id,subject_id'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving subject state:', error);
    }
  };

  const resetAllSubjectStates = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('subject_states')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error resetting subject states:', error);
    }
  };

  return {
    loadSubjectStates,
    saveSubjectState,
    resetAllSubjectStates,
    loading
  };
}