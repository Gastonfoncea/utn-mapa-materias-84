import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';

export type SubjectStatus = 'available' | 'approved' | 'failed' | 'current' | 'locked';

interface SubjectData {
  name: string;
  year: number;
  status: SubjectStatus;
  code: string;
}

interface SubjectNodeProps {
  data: SubjectData;
  selected?: boolean;
}

const statusStyles = {
  approved: 'bg-academic-green text-white border-academic-green shadow-lg',
  failed: 'bg-academic-red text-white border-academic-red shadow-lg',
  current: 'bg-academic-yellow text-gray-800 border-academic-yellow shadow-lg',
  available: 'bg-white text-foreground border-primary hover:border-utn-blue shadow-md',
  locked: 'bg-academic-gray text-gray-600 border-academic-gray opacity-70'
};

const statusText = {
  approved: 'Aprobada',
  failed: 'Desaprobada', 
  current: 'Cursando',
  available: 'Disponible',
  locked: 'No disponible'
};

function SubjectNode({ data, selected }: SubjectNodeProps) {
  const isInteractive = data.status === 'available' || data.status === 'approved' || 
                       data.status === 'failed' || data.status === 'current';

  return (
    <div className={cn(
      'relative min-w-[160px] max-w-[200px] p-3 rounded-lg border-2 transition-all duration-200',
      'text-sm font-medium text-center cursor-pointer select-none',
      statusStyles[data.status],
      selected && 'ring-2 ring-primary ring-offset-2',
      !isInteractive && 'cursor-not-allowed'
    )}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-primary border-2 border-white"
      />
      
      <div className="space-y-1">
        <div className="font-semibold text-xs leading-tight">
          {data.name}
        </div>
        <div className="text-xs opacity-90">
          {data.year}° Año
        </div>
        <div className="text-xs opacity-80">
          {statusText[data.status]}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-primary border-2 border-white"
      />
    </div>
  );
}

export default memo(SubjectNode);