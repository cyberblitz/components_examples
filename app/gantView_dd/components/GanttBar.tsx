'use client';

// components/GanttBar.tsx
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ResizableBox } from 'react-resizable';

interface GanttBarProps {
  task: { id: number; name: string; duration: number };
}

const GanttBar: React.FC<GanttBarProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null); // Create a ref for the div element
  drag(ref); // Apply the drag functionality to the ref

  return (
    <ResizableBox
      width={task.duration}
      height={30}
      className="bg-blue-500 text-white rounded shadow-lg p-1 cursor-pointer"
    >
      <div
        ref={ref} // Use the ref here
        className={`gantt-bar ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        style={{ width: task.duration }}
      >
        {task.name}
      </div>
    </ResizableBox>
  );
};

export default GanttBar;
