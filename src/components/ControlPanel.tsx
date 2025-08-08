import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { BarChart3, GraduationCap, LogOut, Menu, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ControlPanelProps {
  onResetAll: () => void;
  permanentMode: boolean;
  onTogglePermanentMode: () => void;
  subjects: any[];
  approvedOrder: number[];
  regularOrder: number[];
  stats: {
    approved: number;
    current: number;
    regular: number;
    available: number;
    locked: number;
    'elective-sufficient': number;
    'optional': number;
    total: number;
    electiveCredits: { total: number; };
    isAnalista: boolean;
    isIngeniero: boolean;
  };
}

export function ControlPanel({ onResetAll, stats, permanentMode, onTogglePermanentMode, subjects, approvedOrder, regularOrder }: ControlPanelProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // Calcular progreso basado solo en materias requeridas para el título
  const calculateProgress = () => {
    // Electivas requeridas: 20 créditos total
    const electivasRequeridas = Math.min(stats.electiveCredits.total, 20);
    
    // Materias obligatorias aprobadas = total aprobadas - electivas aprobadas (contando solo las que suman al mínimo)
    const electivasAprobadas = subjects.filter(s => s.electiva && s.status === 'approved').length;
    const materiasObligatoriasAprobadas = stats.approved - electivasAprobadas;
    
    // Total requerido para el título: materias obligatorias (37) + electivas requeridas (20 créditos = ~7 materias)
    const materiasObligatoriasTotal = 37; // Total de materias no electivas
    const electivasRequeridisTotal = 7; // Aproximadamente 7 materias para 20 créditos
    const totalRequerido = materiasObligatoriasTotal + electivasRequeridisTotal; // = 44
    
    // Total aprobado para el título (limitando electivas a las requeridas)
    const electivasEquivalentes = Math.min(Math.floor(electivasRequeridas / 3), electivasRequeridisTotal);
    const totalAprobado = materiasObligatoriasAprobadas + electivasEquivalentes;
    
    // Limitar el porcentaje a máximo 100%
    const percentage = Math.min((totalAprobado / totalRequerido) * 100, 100);
    return percentage.toFixed(1);
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

  
  // Funciones helper para obtener listas de materias
  const getApprovedSubjects = () => {
    return approvedOrder.map(id => subjects.find(s => s.id === id)).filter(Boolean);
  };
  
  const getRegularSubjects = () => {
    return regularOrder.map(id => subjects.find(s => s.id === id)).filter(Boolean);
  };
  
  const getAvailableSubjects = () => {
    return subjects.filter(s => s.status === 'available').sort((a, b) => a.nivel - b.nivel || a.nombre.localeCompare(b.nombre));
  };
  
  const getLockedSubjects = () => {
    return subjects.filter(s => s.status === 'locked').sort((a, b) => a.nivel - b.nivel || a.nombre.localeCompare(b.nombre));
  };

  const PanelContent = () => (
    <div className="space-y-4">
      {/* Tarjeta de autenticación */}
      <Card className="bg-card/95 backdrop-blur border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary flex items-center gap-2 text-base">
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
      <Card className="bg-card/95 backdrop-blur border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary flex items-center gap-2 text-base">
            <GraduationCap className="w-5 h-5" />
            UTN Córdoba
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Progreso: <span className="font-semibold text-primary">{progress}%</span>
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
            <Button
              onClick={() => {
                onResetAll();
                setOpen(false);
              }}
              variant="outline"
              size="sm"
              className="h-8 px-3"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reiniciar
            </Button>
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Leyenda compacta */}
      <Card className="bg-card/95 backdrop-blur border-border">
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
              <div className="w-3 h-3 rounded bg-blue-700 flex-shrink-0"></div>
              <span>Cursando ({stats.current})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-academic-yellow flex-shrink-0"></div>
              <span>Regular ({stats.regular})</span>
            </div>
            {!(permanentMode && stats['optional'] > 0) && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-background border border-primary flex-shrink-0"></div>
                <span>Disponible ({stats.available})</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-academic-gray flex-shrink-0"></div>
            <span>No disponible ({stats.locked})</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-purple-200 border border-purple-400 flex-shrink-0"></div>
            <span>Opcional ({stats['optional']})</span>
          </div>
          <div className="mt-3 pt-2 border-t">
            <Button
              onClick={onTogglePermanentMode}
              variant={permanentMode ? "default" : "outline"}
              size="sm"
              className="w-full text-xs h-8"
            >
              {permanentMode ? "Modo Permanente ON" : "Modo Permanente OFF"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Créditos de electivas */}
      <Card className="bg-card/95 backdrop-blur border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Créditos de Electivas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-medium">{stats.electiveCredits.total}/20</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((stats.electiveCredits.total / 20) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listas de materias por estado */}
      {getApprovedSubjects().length > 0 && (
        <Card className="bg-green-50 backdrop-blur border-academic-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-academic-green">
              <div className="w-3 h-3 rounded bg-academic-green"></div>
              Materias Aprobadas ({getApprovedSubjects().length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
              {getApprovedSubjects().map((subject, index) => (
                <div key={subject.id} className="flex justify-between items-center">
                  <span>{index + 1}. {subject.nombre}</span>
                  <span className="text-gray-500">Nivel {subject.nivel}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {getRegularSubjects().length > 0 && (
        <Card className="bg-yellow-50 backdrop-blur border-academic-yellow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-yellow-700">
              <div className="w-3 h-3 rounded bg-academic-yellow"></div>
              Materias Regulares ({getRegularSubjects().length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs">
              {getRegularSubjects().map((subject, index) => (
                <div key={subject.id} className="flex justify-between items-center">
                  <span>{index + 1}. {subject.nombre}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Nivel {subject.nivel}</span>
                    <span className="bg-yellow-200 px-1 rounded text-yellow-800 font-semibold">
                      {subject.attempts || 4} intentos
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {getAvailableSubjects().length > 0 && !(permanentMode && stats['optional'] > 0) && (
        <Card className="bg-blue-50 backdrop-blur border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-blue-700">
              <div className="w-3 h-3 rounded bg-white border border-primary"></div>
              Materias Disponibles ({getAvailableSubjects().length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
              {getAvailableSubjects().map((subject, index) => (
                <div key={subject.id} className="flex justify-between items-center">
                  <span>{index + 1}. {subject.nombre}</span>
                  <span className="text-gray-500">Nivel {subject.nivel}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {getLockedSubjects().length > 0 && (
        <Card className="bg-muted/95 backdrop-blur border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
              <div className="w-3 h-3 rounded bg-academic-gray"></div>
              Materias No Disponibles ({getLockedSubjects().length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
               {getLockedSubjects().map((subject, index) => (
                 <div key={subject.id} className="flex justify-between items-center">
                   <span>{index + 1}. {subject.nombre}</span>
                   <span className="text-muted-foreground">Nivel {subject.nivel}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controles principales - REMOVIDO, botón movido arriba */}

      {/* Instrucciones móvil */}
      <Card className="bg-card/95 backdrop-blur border-border">
        <CardContent className="pt-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
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
      <div className="hidden md:block absolute top-4 left-4 z-10 max-w-xs max-h-screen overflow-y-auto">
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