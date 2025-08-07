import { memo } from 'react';

interface YearHeaderProps {
  data: {
    year: number;
  };
}

function YearHeader({ data }: YearHeaderProps) {
  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-md font-semibold text-center text-lg min-w-[120px]">
      {data.year}° Año
    </div>
  );
}

export default memo(YearHeader);