// components/Grid.tsx
import React from 'react';
import { format, addHours } from 'date-fns';

const Grid: React.FC = () => {
  const startTime = new Date();
  const hours = Array.from({ length: 24 }, (_, i) => addHours(startTime, i));

  return (
    <div className="grid">
      <div className="grid grid-cols-24 border-b border-gray-300">
        {hours.map((hour, index) => (
          <div key={index} className="text-center border-r border-gray-300 p-2 text-sm">
            {format(hour, 'HH:mm')}
          </div>
        ))}
      </div>
      {/* Task rows will be added here */}
    </div>
  );
};

export default Grid;
