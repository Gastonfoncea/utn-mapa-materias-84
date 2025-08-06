import { useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Subject } from '@/data/subjects'
import { SubjectStatus } from '@/components/SubjectNode'

export function useSubjectDatabase(userId: string | undefined) {
  
  // Cargar estado de materias desde Supabase
  const loadSubjectStates = useCallback(async (): Promise<Record<number, SubjectStatus> | null> => {
    if (!userId) return null

    try {
      console.log('Cargando estados para usuario:', userId);
      const { data, error } = await supabase
        .from('estado_materias')
        .select('subject_id, status')
        .eq('user_id', userId)

      if (error) {
        console.error('Error al cargar estados de materias:', error)
        return null
      }

      console.log('Datos cargados de BD:', data);
      const stateMap: Record<number, SubjectStatus> = {}
      data?.forEach(item => {
        stateMap[item.subject_id] = item.status as SubjectStatus
      })

      return stateMap
    } catch (error) {
      console.error('Error al cargar estados de materias:', error)
      return null
    }
  }, [userId])

  // Guardar estado de una materia en Supabase
  const saveSubjectState = useCallback(async (subjectId: number, status: SubjectStatus) => {
    if (!userId) return

    try {
      console.log('Guardando estado de materia:', { userId, subjectId, status });
      const { data, error } = await supabase
        .from('estado_materias')
        .upsert({
          user_id: userId,
          subject_id: subjectId,
          status: status
        }, {
          onConflict: 'user_id,subject_id'
        })

      if (error) {
        console.error('Error al guardar estado de materia:', error)
      } else {
        console.log('Estado guardado exitosamente:', data);
      }
    } catch (error) {
      console.error('Error al guardar estado de materia:', error)
    }
  }, [userId])

  // Guardar todos los estados de materias
  const saveAllSubjectStates = useCallback(async (subjects: Subject[]) => {
    if (!userId) return

    try {
      const stateData = subjects.map(subject => ({
        user_id: userId,
        subject_id: subject.id,
        status: subject.status
      }))

      const { error } = await supabase
        .from('estado_materias')
        .upsert(stateData, {
          onConflict: 'user_id,subject_id'
        })

      if (error) {
        console.error('Error al guardar todos los estados:', error)
      }
    } catch (error) {
      console.error('Error al guardar todos los estados:', error)
    }
  }, [userId])

  // Resetear todos los estados del usuario
  const resetUserStates = useCallback(async () => {
    if (!userId) return

    try {
      const { error } = await supabase
        .from('estado_materias')
        .delete()
        .eq('user_id', userId)

      if (error) {
        console.error('Error al resetear estados:', error)
      }
    } catch (error) {
      console.error('Error al resetear estados:', error)
    }
  }, [userId])

  return {
    loadSubjectStates,
    saveSubjectState,
    saveAllSubjectStates,
    resetUserStates
  }
}