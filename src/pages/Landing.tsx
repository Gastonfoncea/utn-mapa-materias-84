import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, TrendingUp, Users } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate("/mapa");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-utn-blue-light via-background to-utn-blue/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-utn-blue/10 rounded-full">
              <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-utn-blue" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Planifica tu carrera en la{" "}
            <span className="text-utn-blue">UTN Córdoba</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Visualiza las correlativas de tu carrera, planifica tus materias y 
            lleva un seguimiento inteligente de tu progreso académico.
          </p>
          
          <Button 
            onClick={handleStartPlanning}
            size="lg"
            className="text-lg px-8 py-6 bg-utn-blue hover:bg-utn-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Comenzar a Planificar
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-card rounded-xl shadow-sm border">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Seguimiento Visual
            </h3>
            <p className="text-muted-foreground">
              Mapa interactivo que muestra tu progreso y las materias disponibles 
              según tus correlativas aprobadas.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-xl shadow-sm border">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Planificación Inteligente
            </h3>
            <p className="text-muted-foreground">
              Simula cuatrimestres futuros y optimiza tu camino hacia la graduación 
              con sugerencias automáticas.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-xl shadow-sm border">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full w-fit mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Diseñado para UTN
            </h3>
            <p className="text-muted-foreground">
              Específicamente creado para estudiantes de Ingeniería de la UTN Córdoba, 
              con todas las correlativas actualizadas.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-utn-blue to-utn-blue-dark py-12 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para organizar tu carrera?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a cientos de estudiantes que ya optimizan su tiempo de estudio 
            y planifican su graduación de manera eficiente.
          </p>
          <Button 
            onClick={handleStartPlanning}
            variant="secondary"
            size="lg"
            className="text-lg px-8 py-6 bg-white text-utn-blue hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explorar el Mapa de Materias
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;