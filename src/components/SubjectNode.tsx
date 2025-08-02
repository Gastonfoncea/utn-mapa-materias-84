import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';

export type SubjectStatus = 'available' | 'approved' | 'failed' | 'current' | 'regular' | 'locked' | 'elective-sufficient';

interface SubjectData {
  nombre: string;
  nivel: number;
  status: SubjectStatus;
  modalidad: string;
  electiva: boolean;
  onClick?: () => void;
  isHighlighted?: boolean;
  highlightType?: 'regular' | 'approved';
}

interface SubjectNodeProps {
  data: SubjectData;
  selected?: boolean;
  onClick?: () => void;
  isHighlighted?: boolean;
}

const statusStyles = {
  approved: 'bg-academic-green text-white border-academic-green shadow-lg',
  failed: 'bg-academic-red text-white border-academic-red shadow-lg',
  current: 'bg-academic-yellow text-gray-800 border-academic-yellow shadow-lg',
  regular: 'bg-academic-blue text-white border-academic-blue shadow-lg',
  available: 'bg-white text-foreground border-primary hover:border-utn-blue shadow-md',
  locked: 'bg-academic-gray text-gray-600 border-academic-gray opacity-70',
  'elective-sufficient': 'bg-purple-100 text-purple-800 border-purple-300 shadow-md'
};

const statusText = {
  approved: 'Aprobada',
  failed: 'Desaprobada', 
  current: 'Cursando',
  regular: 'Regular',
  available: 'Disponible',
  locked: 'No disponible',
  'elective-sufficient': 'Créditos suficientes'
};

function SubjectNode({ data, selected }: SubjectNodeProps) {
  const isInteractive = data.status === 'available' || data.status === 'approved' || 
                       data.status === 'failed' || data.status === 'current' || data.status === 'regular';

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

  return (
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
      onClick={data.onClick}
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
  );
}

export default memo(SubjectNode);