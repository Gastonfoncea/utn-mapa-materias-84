import { memo } from 'react';

interface YearSeparatorProps {
  data: {
    type: 'vertical' | 'horizontal';
    label?: string;
  };
}

function YearSeparator({ data }: YearSeparatorProps) {
  if (data.type === 'vertical') {
    return (
      <div className="w-1 h-full bg-border/60 rounded-full"></div>
    );
  }
  
  return (
    <div className="flex items-center w-full">
      <div className="flex-1 h-px bg-border"></div>
      {data.label && (
        <>
          <span className="px-3 text-xs text-muted-foreground bg-background">{data.label}</span>
          <div className="flex-1 h-px bg-border"></div>
        </>
      )}
    </div>
  );
}

export default memo(YearSeparator);