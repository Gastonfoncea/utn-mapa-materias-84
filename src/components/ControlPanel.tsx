import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RotateCcw, GraduationCap, Menu, BarChart3, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

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
  };
}

export function ControlPanel({ onResetAll, stats }: ControlPanelProps) {
  const [open, setOpen] = useState(false);
  const { user, signInWithGoogle, signOut } = useAuth();
  const progress = ((stats.approved / stats.total) * 100).toFixed(1);

  const PanelContent = () => (
    <div className="space-y-4">
      {/* Tarjeta de autenticación */}
      <Card className="bg-white/95 backdrop-blur border-utn-blue">
        <CardHeader className="pb-3">
          <CardTitle className="text-utn-blue flex items-center gap-2 text-base">
            {user ? (
              <>
                <GraduationCap className="w-5 h-5" />
                ¡Hola, {user.user_metadata?.full_name || user.email}!
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
              onClick={signOut}
              variant="outline"
              className="w-full text-sm h-10"
              size="default"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          ) : (
            <Button
              onClick={signInWithGoogle}
              className="w-full text-sm h-10 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 shadow-sm font-medium transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
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
            {stats.isAnalista && (
              <span className="ml-2 text-xs bg-academic-green text-white px-2 py-1 rounded-full font-medium">
                Analista
              </span>
            )}
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