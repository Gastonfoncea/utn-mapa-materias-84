import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { BarChart3, GraduationCap, LogOut, Menu, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ControlPanelProps {
  onResetAll: () => void;
  stats: {
    approved: number;
    current: number;
    regular: number;
    failed: number;
    available: number;
    locked: number;
    'elective-sufficient': number;
    'optional': number;
    total: number;
    electiveCredits: { year3: number; year4: number; year5: number; };
    isAnalista: boolean;
    isIngeniero: boolean;
  };
}

export function ControlPanel({ onResetAll, stats }: ControlPanelProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // Calcular progreso con lógica especial para electivas extras
  const calculateProgress = () => {
    if (stats.isIngeniero) {
      return 100; // Una vez ingeniero, progreso al 100%
    }
    
    // Calcular el total ajustado excluyendo electivas extras
    const electiveExtras4to = Math.max(0, (stats.electiveCredits.year4 / 3) - 2); // A partir de la 3era electiva de 4to
    const electiveExtras5to = Math.max(0, (stats.electiveCredits.year5 / 3) - 4); // A partir de la 5ta electiva de 5to
    const totalExtras = electiveExtras4to + electiveExtras5to;
    
    const adjustedTotal = stats.total - totalExtras;
    const adjustedApproved = stats.approved - totalExtras;
    
    return ((adjustedApproved / adjustedTotal) * 100).toFixed(1);
  };
  
  const progress = calculateProgress();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded);
      localStorage.setItem('user', JSON.stringify(decoded));
    }
  };

  const handleGoogleLoginError = () => {
    // Optionally show a toast or error message
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const PanelContent = () => (
    <div className="space-y-4">
      {/* Tarjeta de autenticación */}
      <Card className="bg-white/95 backdrop-blur border-utn-blue">
        <CardHeader className="pb-3">
          <CardTitle className="text-utn-blue flex items-center gap-2 text-base">
            {user ? (
              <>
                <GraduationCap className="w-5 h-5" />
                ¡Hola, {user.name || user.given_name || user.family_name || user.email}!
              </>
            ) : (
              <>
                <GraduationCap className="w-5 h-5" />
                Iniciar Sesión
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full text-sm h-10"
              size="default"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          ) : (
            <div className="flex flex-col items-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                width="250"
              />
            </div>
          )}
        </CardContent>
      </Card>
      {/* Header con progreso */}
      <Card className="bg-white/95 backdrop-blur border-utn-blue">
        <CardHeader className="pb-3">
          <CardTitle className="text-utn-blue flex items-center gap-2 text-base">
            <GraduationCap className="w-5 h-5" />
            UTN Córdoba
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-600">
            Progreso: <span className="font-semibold text-utn-blue">{progress}%</span>
            {stats.isIngeniero ? (
              <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-medium">
                Ingeniero
              </span>
            ) : stats.isAnalista ? (
              <span className="ml-2 text-xs bg-academic-green text-white px-2 py-1 rounded-full font-medium">
                Analista
              </span>
            ) : null}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-utn-blue h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Leyenda compacta */}
      <Card className="bg-gray-50 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Estados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-academic-green flex-shrink-0"></div>
              <span>Aprobada ({stats.approved})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-academic-yellow flex-shrink-0"></div>
              <span>Cursando ({stats.current})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-700 flex-shrink-0"></div>
              <span>Regular ({stats.regular})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-academic-red flex-shrink-0"></div>
              <span>Desaprobada ({stats.failed})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-white border border-primary flex-shrink-0"></div>
              <span>Disponible ({stats.available})</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-academic-gray flex-shrink-0"></div>
            <span>No disponible ({stats.locked})</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-purple-200 border border-purple-400 flex-shrink-0"></div>
            <span>Opcional ({stats['optional']})</span>
          </div>
        </CardContent>
      </Card>

      {/* Créditos de electivas */}
      <Card className="bg-gray-50 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Créditos de Electivas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>3° año:</span>
              <span className="font-medium">{stats.electiveCredits.year3}/4</span>
            </div>
            <div className="flex justify-between">
              <span>4° año:</span>
              <span className="font-medium">{stats.electiveCredits.year4}/6</span>
            </div>
            <div className="flex justify-between">
              <span>5° año:</span>
              <span className="font-medium">{stats.electiveCredits.year5}/10</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles principales */}
      <Card className="bg-white/95 backdrop-blur">
        <CardContent className="pt-4 space-y-3">
          <Button
            onClick={() => {
              onResetAll();
              setOpen(false);
            }}
            variant="outline"
            className="w-full text-sm h-11"
            size="default"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar Todo
          </Button>
        </CardContent>
      </Card>

      {/* Instrucciones móvil */}
      <Card className="bg-white/95 backdrop-blur">
        <CardContent className="pt-4">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Instrucciones:</strong><br/>
            • Toca una materia para cambiar su estado<br/>
            • Las correlativas se actualizan automáticamente<br/>
            • Pellizca para hacer zoom en el mapa<br/>
            • Arrastra para navegar por las materias
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      {/* Desktop - Panel lateral */}
      <div className="hidden md:block absolute top-4 left-4 z-10 max-w-xs">
        <PanelContent />
      </div>

      {/* Mobile - Bottom sheet */}
      <div className="md:hidden">
        {/* Botón flotante */}
        <div className="absolute top-4 left-4 z-20">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button 
                size="icon" 
                className="bg-utn-blue hover:bg-utn-blue/90 shadow-lg rounded-full w-12 h-12"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] p-4">
              <div className="overflow-auto h-full">
                <PanelContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Indicador de progreso mini en móvil */}
        <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur rounded-full px-3 py-2 shadow-lg border border-utn-blue">
          <div className="flex items-center gap-2">
            <div className="text-xs font-semibold text-utn-blue">{progress}%</div>
            <div className="w-8 h-2 bg-gray-200 rounded-full">
              <div 
                className="bg-utn-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}