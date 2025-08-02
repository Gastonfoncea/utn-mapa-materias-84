import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Play, GraduationCap } from 'lucide-react';

interface ControlPanelProps {
  onResetAll: () => void;
  onSimulateSemester: () => void;
  stats: {
    approved: number;
    current: number;
    failed: number;
    available: number;
    locked: number;
    total: number;
  };
}

export function ControlPanel({ onResetAll, onSimulateSemester, stats }: ControlPanelProps) {
  const progress = ((stats.approved / stats.total) * 100).toFixed(1);

  return (
    <div className="absolute top-4 left-4 z-10 space-y-4 max-w-xs">
      {/* Header */}
      <Card className="bg-white/95 backdrop-blur border-utn-blue">
        <CardHeader className="pb-2">
          <CardTitle className="text-utn-blue flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            UTN Córdoba - Plan de Estudios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-600">
            Progreso: <span className="font-semibold text-utn-blue">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-utn-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Leyenda */}
      <Card className="bg-white/95 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Estados de Materias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-academic-green"></div>
            <span>Aprobada ({stats.approved})</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-academic-yellow"></div>
            <span>Cursando ({stats.current})</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-academic-red"></div>
            <span>Desaprobada ({stats.failed})</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-white border border-primary"></div>
            <span>Disponible ({stats.available})</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-academic-gray"></div>
            <span>No disponible ({stats.locked})</span>
          </div>
        </CardContent>
      </Card>

      {/* Controles */}
      <Card className="bg-white/95 backdrop-blur">
        <CardContent className="pt-4 space-y-2">
          <Button 
            onClick={onSimulateSemester}
            className="w-full text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            Simular Cuatrimestre
          </Button>
          <Button 
            onClick={onResetAll}
            variant="outline"
            className="w-full text-xs"
            size="sm"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reiniciar Todo
          </Button>
        </CardContent>
      </Card>

      {/* Instrucciones */}
      <Card className="bg-white/95 backdrop-blur">
        <CardContent className="pt-4">
          <p className="text-xs text-gray-600">
            <strong>Cómo usar:</strong><br/>
            • Haz clic en una materia para cambiar su estado<br/>
            • Las correlativas se actualizan automáticamente<br/>
            • Usa los controles para simular o reiniciar
          </p>
        </CardContent>
      </Card>
    </div>
  );
}