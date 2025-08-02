import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, TrendingUp, Users, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate("/mapa");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Cursor Style */}
      <div className="relative overflow-hidden">
        {/* Cursor-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 via-pink-500/20 to-cyan-400/30" />
        <div className="absolute inset-0 bg-gradient-to-bl from-green-400/20 via-transparent to-blue-600/30" />
        
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-noise" />

        <div className="relative z-10 container mx-auto px-6 py-20 sm:py-32">
          <div className="text-center max-w-6xl mx-auto">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-12">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
            </div>
            
            {/* Main Heading - Cursor style */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight">
              Planifica tu carrera en la
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight">
              <span className="text-cyan-300">UTN Córdoba</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/80 mb-16 leading-relaxed max-w-4xl mx-auto font-medium">
              Visualiza las correlativas de tu carrera, planifica tus materias y 
              lleva un seguimiento inteligente de tu progreso académico.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleStartPlanning}
                size="lg"
                className="text-lg px-10 py-6 bg-black hover:bg-gray-900 text-white border-none shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl font-semibold"
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Comenzar a Planificar
              </Button>
              
              <Button 
                onClick={handleStartPlanning}
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 shadow-xl transition-all duration-300 rounded-xl font-semibold"
              >
                Ver Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Fondo Blanco */}
      <div className="bg-background py-12 sm:py-20">
        <div className="container mx-auto px-4">
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
      </div>

      {/* CTA Section - Fondo Azul UTN */}
      <div className="bg-gradient-to-r from-utn-blue to-utn-blue/90 py-12 sm:py-20">
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