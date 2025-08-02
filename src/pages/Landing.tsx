import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, TrendingUp, Users, LogOut, Clock, Target } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";

const Landing = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, signOut } = useAuth();

  const handleStartPlanning = () => {
    navigate("/mapa");
  };

  const handleSignIn = () => {
    signInWithGoogle();
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section - Cursor Style */}
      <div className="relative overflow-hidden">
        {/* Gray gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-600/30 via-gray-500/20 to-gray-400/30" />
        <div className="absolute inset-0 bg-gradient-to-bl from-gray-300/20 via-transparent to-gray-800/30" />
        
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
              <span className="text-white">UTN Córdoba</span>
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
              
              {!user && (
                <Button 
                  onClick={handleSignIn}
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 shadow-xl transition-all duration-300 rounded-xl font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Iniciar con Google
                </Button>
              )}
              
              {user && (
                <div className="flex items-center gap-4">
                  <span className="text-white/90 text-lg">¡Hola, {user.user_metadata?.full_name || user.email}!</span>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    size="lg"
                    className="text-lg px-6 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 shadow-xl transition-all duration-300 rounded-xl font-semibold"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Fondo Blanco */}
      <div className="bg-background py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-card rounded-xl shadow-sm border">
              <div className="p-3 bg-gray-100 dark:bg-gray-900/20 rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-600 dark:text-gray-400" />
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
              <div className="p-3 bg-gray-100 dark:bg-gray-900/20 rounded-full w-fit mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-600 dark:text-gray-400" />
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
              <div className="p-3 bg-gray-100 dark:bg-gray-900/20 rounded-full w-fit mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-600 dark:text-gray-400" />
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

      {/* Sección de estadísticas con tarjetas coloridas */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          {/* Título principal */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Planificar puede ser <span className="text-blue-600">divertido</span> 😊
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Menos estrés 😌 mejores resultados 🎓
            </p>
          </div>

          {/* Grid de tarjetas estadísticas */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Tarjeta 1 - Rendimiento elevado */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Planificación inteligente</h3>
              </div>
              
              <div className="mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  <span className="text-3xl">92%</span> mejora su organización.
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Nuestro mapa te ayuda a enfocarte solo en las materias que puedes cursar, 
                  optimizando tu tiempo y evitando frustración.
                </p>
              </div>

              {/* Gráfico circular azul */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${92 * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xl font-bold text-gray-900">+2400</div>
                    <div className="text-sm text-gray-600">Estudiantes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta 2 - Productividad real */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Ahorro de tiempo</h3>
              </div>
              
              <div className="mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  <span className="text-3xl">85%</span> reduce tiempo de planificación.
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Visualización automática de correlativas = menos tiempo perdido 
                  planificando, más tiempo estudiando con foco total.
                </p>
              </div>

              {/* Gráfico circular púrpura */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      stroke="#9333ea"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${85 * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xl font-bold text-gray-900">+1800</div>
                    <div className="text-sm text-gray-600">Estudiantes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Same gray gradient as hero */}
      <div className="relative overflow-hidden">
        {/* Same gray gradient as hero section */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-600/30 via-gray-500/20 to-gray-400/30" />
        <div className="absolute inset-0 bg-gradient-to-bl from-gray-300/20 via-transparent to-gray-800/30" />
        
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-noise" />

        <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 text-center">
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
            className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explorar el Mapa de Materias
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;