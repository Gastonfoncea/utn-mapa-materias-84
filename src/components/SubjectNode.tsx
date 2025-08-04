import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export type SubjectStatus = 'available' | 'approved' | 'current' | 'regular' | 'locked' | 'elective-sufficient' | 'optional';

interface SubjectData {
  nombre: string;
  nivel: number;
  status: SubjectStatus;
  modalidad: string;
  electiva: boolean;
  onClick?: () => void;
  onStatusChange?: (status: SubjectStatus) => void;
  onSpecialAction?: (action: 'cursar' | 'rendir' | 'normal') => void;
  onClearHighlights?: () => void;
  isSpecial?: boolean;
  canBeRendered?: boolean;
  isHighlighted?: boolean;
  highlightType?: 'regular' | 'approved';
  attempts?: number;
  onDecrementAttempts?: () => void;
}

interface SubjectNodeProps {
  data: SubjectData;
  selected?: boolean;
  onClick?: () => void;
  isHighlighted?: boolean;
}

const statusStyles = {
  approved: 'bg-academic-green text-white border-academic-green shadow-lg',
  current: 'bg-academic-yellow text-gray-800 border-academic-yellow shadow-lg',
  regular: 'bg-blue-700 text-white border-blue-700 shadow-lg',
  available: 'bg-white text-foreground border-primary hover:border-utn-blue shadow-md',
  locked: 'bg-gray-400 text-gray-700 border-gray-400 shadow-lg',
  'elective-sufficient': 'bg-purple-100 text-purple-800 border-purple-300 shadow-md',
  'optional': 'bg-purple-200 text-purple-900 border-purple-400 shadow-md'
};

const statusText = {
  approved: 'Aprobada',
  current: 'Cursando',
  regular: 'Regular',
  available: 'Disponible',
  locked: 'No disponible',
  'elective-sufficient': 'Créditos suficientes',
  'optional': 'Opcional'
};

function SubjectNode({ data, selected }: SubjectNodeProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const isInteractive = data.status === 'available' || data.status === 'approved' || 
                       data.status === 'current' || data.status === 'regular' || data.status === 'optional';

  const getHighlightColor = () => {
    if (!data.isHighlighted) return '';
    
    switch (data.highlightType) {
      case 'approved':
        return 'ring-4 ring-blue-400 ring-opacity-75 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]';
      case 'regular':
        return 'ring-4 ring-yellow-400 ring-opacity-75 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]';
      default:
        return 'ring-4 ring-yellow-400 ring-opacity-75 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]';
    }
  };

  const handleStatusSelect = (status: SubjectStatus) => {
    if (data.onStatusChange) {
      data.onStatusChange(status);
    }
    setPopoverOpen(false);
  };

  const handleSpecialAction = (action: 'cursar' | 'rendir' | 'normal') => {
    if (data.onSpecialAction) {
      data.onSpecialAction(action);
    }
    setPopoverOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Si la materia está en estado regular, mostrar contador de oportunidades
    if (data.status === 'regular') {
      // PRIMERO limpiar highlights usando la función específica
      if (data.onClearHighlights) {
        data.onClearHighlights();
      }
      setPopoverOpen(true);
      return;
    }
    
    // Materias especiales bloqueadas - abrir popover especial únicamente
    if (data.status === 'locked' && data.isSpecial) {
      // PRIMERO limpiar highlights usando la función específica
      if (data.onClearHighlights) {
        data.onClearHighlights();
      }
      setPopoverOpen(true);
      return;
    }
    
    // Materias interactivas que NO están bloqueadas - limpiar highlights y abrir popover
    if (isInteractive && data.status !== 'locked') {
      // PRIMERO limpiar highlights usando la función específica
      if (data.onClearHighlights) {
        data.onClearHighlights();
      }
      setPopoverOpen(true);
      return;
    }
    
    // Para materias bloqueadas normales y no interactivas - usar onClick original
    if (data.onClick) {
      data.onClick();
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <div 
          className={cn(
            'relative w-32 sm:w-36 md:min-w-[160px] md:max-w-[200px] p-2 sm:p-3 rounded-lg border-2 transition-all duration-200',
            'text-xs sm:text-sm font-medium text-center cursor-pointer select-none',
            'shadow-md hover:shadow-lg',
            statusStyles[data.status],
            selected && 'ring-2 ring-primary ring-offset-2',
            !isInteractive && 'cursor-not-allowed',
            getHighlightColor()
          )}
          onClick={handleClick}
        >
          <Handle
            type="target"
            position={Position.Left}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-primary border-2 border-white"
          />
          
          <div className="space-y-1">
            <div className="font-semibold text-[10px] sm:text-xs leading-tight line-clamp-2">
              {data.nombre}
            </div>
            <div className="text-[9px] sm:text-xs opacity-90">
              Nivel {data.nivel}
              {data.status === 'regular' && data.attempts && (
                <span className="ml-1 px-1 bg-utn-blue/20 rounded text-utn-blue font-bold">
                  {data.attempts}
                </span>
              )}
            </div>
            <div className="text-[8px] sm:text-xs opacity-80 hidden sm:block">
              {data.electiva ? 'Electiva' : statusText[data.status]}
            </div>
          </div>

          <Handle
            type="source"
            position={Position.Right}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-primary border-2 border-white"
          />
        </div>
      </PopoverTrigger>
      
      {data.status === 'regular' ? (
        <PopoverContent className="w-auto p-2 bg-white z-50" align="center">
          <div className="space-y-3">
            <div className="text-center p-2 border-b">
              <p className="text-sm font-medium text-foreground mb-1">Oportunidades restantes:</p>
              <div className="text-xl font-bold text-utn-blue">
                {data.attempts || 4}
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                size="sm"
                className="justify-center h-8 px-3 text-xs border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (data.onDecrementAttempts) {
                    data.onDecrementAttempts();
                  }
                  setPopoverOpen(false);
                }}
                disabled={!data.attempts || data.attempts <= 0}
              >
                Descontar oportunidad
              </Button>
              
              <div className="border-t pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-8 px-3 text-xs hover:bg-gray-100 w-full"
                  onClick={() => handleStatusSelect('available')}
                >
                  <div className="w-3 h-3 rounded bg-white border border-gray-300 mr-2"></div>
                  Disponible
                </Button>
                {data.canBeRendered && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start h-8 px-3 text-xs hover:bg-gray-100 w-full"
                    onClick={() => handleStatusSelect('approved')}
                  >
                    <div className="w-3 h-3 rounded bg-academic-green mr-2"></div>
                    Aprobada
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-8 px-3 text-xs hover:bg-gray-100 w-full"
                  onClick={() => handleStatusSelect('current')}
                >
                  <div className="w-3 h-3 rounded bg-academic-yellow mr-2"></div>
                  Cursando
                </Button>
                {data.electiva && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start h-8 px-3 text-xs hover:bg-gray-100 w-full"
                    onClick={() => handleStatusSelect('optional')}
                  >
                    <div className="w-3 h-3 rounded bg-purple-200 border border-purple-400 mr-2"></div>
                    Opcional
                  </Button>
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      ) : isInteractive && data.status !== 'locked' && (
        <PopoverContent className="w-auto p-2 bg-white z-50" align="center">
          <div className="flex flex-col gap-1">
            {/* Menú normal para todas las materias cuando están disponibles */}
            <Button
              variant="ghost"
              size="sm"
              className="justify-start h-8 px-3 text-xs hover:bg-gray-100"
              onClick={() => handleStatusSelect('available')}
            >
              <div className="w-3 h-3 rounded bg-white border border-gray-300 mr-2"></div>
              Disponible
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start h-8 px-3 text-xs hover:bg-gray-100"
              onClick={() => handleStatusSelect('regular')}
            >
              <div className="w-3 h-3 rounded bg-blue-700 mr-2"></div>
              Regular
            </Button>
            {data.canBeRendered && (
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-8 px-3 text-xs hover:bg-gray-100"
                onClick={() => handleStatusSelect('approved')}
              >
                <div className="w-3 h-3 rounded bg-academic-green mr-2"></div>
                Aprobada
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="justify-start h-8 px-3 text-xs hover:bg-gray-100"
              onClick={() => handleStatusSelect('current')}
            >
              <div className="w-3 h-3 rounded bg-academic-yellow mr-2"></div>
              Cursando
            </Button>
            {data.electiva && (
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-8 px-3 text-xs hover:bg-gray-100"
                onClick={() => handleStatusSelect('optional')}
              >
                <div className="w-3 h-3 rounded bg-purple-200 border border-purple-400 mr-2"></div>
                Opcional
              </Button>
            )}
          </div>
        </PopoverContent>
      )}
      
      {data.status === 'locked' && data.isSpecial && (
        <PopoverContent className="w-auto p-2 bg-white z-50" align="center">
          <div className="flex flex-col gap-1">
            {/* Menú especial solo para materias bloqueadas que son especiales */}
            <Button
              variant="ghost"
              size="sm"
              className="justify-start h-8 px-3 text-xs hover:bg-gray-100"
              onClick={() => handleSpecialAction('cursar')}
            >
              <div className="w-3 h-3 rounded bg-academic-yellow mr-2"></div>
              Para cursar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start h-8 px-3 text-xs hover:bg-gray-100"
              onClick={() => handleSpecialAction('rendir')}
            >
              <div className="w-3 h-3 rounded bg-academic-green mr-2"></div>
              Para rendir
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start h-8 px-3 text-xs hover:bg-gray-100"
              onClick={() => handleSpecialAction('normal')}
            >
              <div className="w-3 h-3 rounded bg-white border border-gray-300 mr-2"></div>
              Normal
            </Button>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}

export default memo(SubjectNode);