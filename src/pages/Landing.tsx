import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, TrendingUp, Users, Sparkles, Zap } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate("/mapa");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-purple))] via-[hsl(var(--gradient-magenta))] to-[hsl(var(--gradient-cyan))] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-tl from-[hsl(var(--gradient-emerald))] via-transparent to-[hsl(var(--gradient-orange))] opacity-60" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-24">
        <div className="text-center max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-2xl">
              <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
            El Planificador de{" "}
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-pulse">
              Carrera IA
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Revoluciona tu experiencia académica. Visualiza correlativas, 
            planifica con inteligencia artificial y domina tu futuro profesional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleStartPlanning}
              size="lg"
              className="text-xl px-12 py-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 shadow-2xl hover:shadow-white/25 transition-all duration-500 transform hover:scale-105 hover:rotate-1 rounded-2xl"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Iniciar Experiencia
            </Button>
            
            <Button 
              onClick={handleStartPlanning}
              variant="outline"
              size="lg"
              className="text-xl px-12 py-8 bg-transparent backdrop-blur-sm hover:bg-white/10 text-white border-2 border-white/50 hover:border-white/70 shadow-xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 rounded-2xl"
            >
              <Zap className="w-6 h-6 mr-3" />
              Ver Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group text-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="p-4 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl w-fit mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
              <TrendingUp className="w-10 h-10 text-emerald-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Análisis Inteligente
            </h3>
            <p className="text-white/80 text-lg leading-relaxed">
              Algoritmos avanzados analizan tu progreso y sugieren el camino 
              óptimo hacia tu graduación con precisión de IA.
            </p>
          </div>
          
          <div className="group text-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="p-4 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-2xl w-fit mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
              <BookOpen className="w-10 h-10 text-cyan-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Visualización 3D
            </h3>
            <p className="text-white/80 text-lg leading-relaxed">
              Experimenta tus correlativas en un mapa interactivo inmersivo 
              que hace la planificación académica intuitiva y visual.
            </p>
          </div>
          
          <div className="group text-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="p-4 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-2xl w-fit mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
              <Users className="w-10 h-10 text-orange-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ecosistema UTN
            </h3>
            <p className="text-white/80 text-lg leading-relaxed">
              Diseñado específicamente para el ecosistema académico de UTN Córdoba,
              con datos actualizados en tiempo real.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto p-12 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              ¿Preparado para el Futuro?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Únete a la revolución académica. Miles de estudiantes ya están 
              transformando su experiencia universitaria con tecnología de vanguardia.
            </p>
            <Button 
              onClick={handleStartPlanning}
              size="lg"
              className="text-xl px-16 py-8 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-black font-black shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-110 rounded-2xl"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Comenzar Ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;