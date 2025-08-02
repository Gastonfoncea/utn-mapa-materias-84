import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RotateCcw, GraduationCap, Menu, BarChart3 } from 'lucide-react';
import { useState } from 'react';

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
    total: number;
  };
}

export function ControlPanel({ onResetAll, stats }: ControlPanelProps) {
  const [open, setOpen] = useState(false);
  const progress = ((stats.approved / stats.total) * 100).toFixed(1);

  const PanelContent = () => (
    <div className="space-y-4">
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
      <Card className="bg-white/95 backdrop-blur">
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
              <div className="w-3 h-3 rounded bg-academic-blue flex-shrink-0"></div>
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
            <div className="w-3 h-3 rounded bg-purple-100 border border-purple-300 flex-shrink-0"></div>
            <span>Créditos suficientes ({stats['elective-sufficient']})</span>
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