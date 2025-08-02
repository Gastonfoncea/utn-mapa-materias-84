import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = () => {
    // TODO: Implementar autenticación con Google usando Supabase
    console.log("Sign in with Google");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y nombre */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="p-2 bg-utn-blue/10 rounded-lg">
              <GraduationCap className="w-8 h-8 text-utn-blue" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Planificador UTN</h1>
              <p className="text-sm text-gray-600">Córdoba</p>
            </div>
          </div>

          {/* Navegación central */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-utn-blue transition-colors font-medium"
            >
              Características
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-utn-blue transition-colors font-medium"
            >
              Acerca de
            </a>
            <a 
              href="/mapa" 
              className="text-gray-700 hover:text-utn-blue transition-colors font-medium"
            >
              Ver Mapa
            </a>
          </nav>

          {/* Botón Sign in - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleSignIn}
              className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 shadow-sm font-medium px-6 py-2 rounded-lg transition-all duration-200"
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
          </div>

          {/* Menú hamburguesa - Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-200/50 pt-4">
            {/* Login - Primera tarjeta */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <Button
                onClick={handleSignIn}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 shadow-sm font-medium px-6 py-3 rounded-lg transition-all duration-200"
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
            </div>

            {/* Enlaces de navegación */}
            <div className="space-y-3">
              <a 
                href="#features" 
                className="block text-gray-700 hover:text-utn-blue transition-colors font-medium py-2"
                onClick={toggleMenu}
              >
                Características
              </a>
              <a 
                href="#about" 
                className="block text-gray-700 hover:text-utn-blue transition-colors font-medium py-2"
                onClick={toggleMenu}
              >
                Acerca de
              </a>
              <a 
                href="/mapa" 
                className="block text-gray-700 hover:text-utn-blue transition-colors font-medium py-2"
                onClick={toggleMenu}
              >
                Ver Mapa
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;