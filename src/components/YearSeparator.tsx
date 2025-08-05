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
      <div className="w-px h-full bg-gray-300 opacity-50"></div>
    );
  }
  
  return (
    <div className="flex items-center w-full">
      <div className="flex-1 h-px bg-gray-300"></div>
      {data.label && (
        <>
          <span className="px-3 text-xs text-gray-500 bg-white">{data.label}</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </>
      )}
    </div>
  );
}

export default memo(YearSeparator);