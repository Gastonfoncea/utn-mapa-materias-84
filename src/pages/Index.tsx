import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/mapa');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Mapa de Materias UTN
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Visualiza tu progreso académico en Ingeniería en Sistemas de la UTN Córdoba. 
          Gestiona el estado de tus materias y planifica tu carrera de manera interactiva.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate('/mapa')} 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Ver Mapa de Materias
          </Button>
          <Button 
            onClick={() => navigate('/auth')} 
            size="lg"
            variant="outline"
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
