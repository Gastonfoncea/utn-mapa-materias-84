-- Crear tabla para almacenar el estado de las materias por usuario
CREATE TABLE public.estado_materias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'approved', 'failed', 'current', 'regular', 'locked', 'elective-sufficient', 'optional')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, subject_id)
);

-- Habilitar RLS
ALTER TABLE public.estado_materias ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Los usuarios pueden ver su propio estado de materias" 
ON public.estado_materias 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar su propio estado de materias" 
ON public.estado_materias 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar su propio estado de materias" 
ON public.estado_materias 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar su propio estado de materias" 
ON public.estado_materias 
FOR DELETE 
USING (auth.uid() = user_id);

-- Trigger para actualizar updated_at
CREATE TRIGGER update_estado_materias_updated_at
BEFORE UPDATE ON public.estado_materias
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();