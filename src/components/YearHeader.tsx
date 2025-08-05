import { memo } from 'react';

interface YearHeaderProps {
  data: {
    year: number;
  };
}

function YearHeader({ data }: YearHeaderProps) {
  return (
    <div className="bg-utn-blue text-white px-4 py-2 rounded-lg shadow-md font-semibold text-center text-lg">
      {data.year}° Año
    </div>
  );
}

export default memo(YearHeader);