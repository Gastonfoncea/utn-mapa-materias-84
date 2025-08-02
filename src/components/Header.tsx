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
            <div className="p-2 bg-gray-100 rounded-lg">
              <GraduationCap className="w-8 h-8 text-gray-600" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Planificador UTN</h1>
              <p className="text-sm text-gray-600">Córdoba</p>
            </div>
          </div>

          {/* Navegación central */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/mapa" 
              className="text-gray-700 hover:text-utn-blue transition-colors font-medium"
            >
              Ver Mapa
            </a>
          </nav>


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
            {/* Enlaces de navegación */}
            <div className="space-y-3">
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