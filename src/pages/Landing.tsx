import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, ArrowRight, Download, Apple } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate("/mapa");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cursor-style gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 via-pink-500/20 to-cyan-400/30" />
      <div className="absolute inset-0 bg-gradient-to-bl from-green-400/20 via-transparent to-blue-600/30" />
      
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-noise" />

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20 sm:py-32">
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-12">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <GraduationCap className="w-16 h-16 text-white" />
            </div>
          </div>
          
          {/* Main Heading - Cursor style */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tight">
            El Planificador de
          </h1>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tight">
            Carrera con IA
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/80 mb-16 leading-relaxed max-w-4xl mx-auto font-medium">
            Construido para hacerte extraordinariamente productivo. El planificador académico es la mejor manera de visualizar correlativas con IA.
          </p>
          
          {/* CTA Buttons - Cursor style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button 
              onClick={handleStartPlanning}
              size="lg"
              className="group text-lg px-10 py-6 bg-black hover:bg-gray-900 text-white border-none shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl font-semibold min-w-[200px]"
            >
              <Apple className="w-5 h-5 mr-3" />
              Abrir para Web
            </Button>
            
            <Button 
              onClick={handleStartPlanning}
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 shadow-xl transition-all duration-300 rounded-xl font-semibold min-w-[200px]"
            >
              Ver todas las opciones
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-12 text-center">
                <BookOpen className="w-24 h-24 text-white/60 mx-auto mb-6" />
                <p className="text-white/60 text-lg font-medium">Vista previa del mapa de correlativas interactivo</p>
                <Button 
                  onClick={handleStartPlanning}
                  variant="ghost"
                  className="mt-6 text-white/80 hover:text-white hover:bg-white/10 font-medium"
                >
                  Explorar demo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Features Section - Simplified like Cursor */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mx-auto mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-emerald-400 rounded-lg" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Análisis Inteligente
            </h3>
            <p className="text-white/70 text-lg leading-relaxed">
              Algoritmos avanzados que analizan tu progreso académico y sugieren el camino óptimo.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mx-auto mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-cyan-400 rounded-lg" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Visualización Inmersiva
            </h3>
            <p className="text-white/70 text-lg leading-relaxed">
              Mapa interactivo que hace la planificación académica intuitiva y visual.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mx-auto mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-orange-400 rounded-lg" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Específico para UTN
            </h3>
            <p className="text-white/70 text-lg leading-relaxed">
              Diseñado para el ecosistema académico de UTN Córdoba con datos actualizados.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-8">
          Comienza a planificar hoy
        </h2>
        <Button 
          onClick={handleStartPlanning}
          size="lg"
          className="text-xl px-12 py-8 bg-white text-black hover:bg-gray-100 font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
        >
          <BookOpen className="w-6 h-6 mr-3" />
          Explorar el Mapa
        </Button>
      </div>
    </div>
  );
};

export default Landing;