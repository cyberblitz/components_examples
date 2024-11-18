"use client"


// types.ts
export interface Task {
    id: string;
    title: string;
    start: Date;
    duration: number;
    color: string;
  }
  
  // GanttCalendar.tsx
  import React, { useState, useRef } from 'react';
  
  const GanttCalendar: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
      {
        id: '1',
        title: 'Task 1',
        start: new Date(2024, 9, 1, 9), // Oct 1, 2024, 9 AM
        duration: 3, // hours
        color: 'bg-blue-500',
      },
      {
        id: '2',
        title: 'Task 2',
        start: new Date(2024, 9, 1, 13), // Oct 1, 2024, 1 PM
        duration: 2,
        color: 'bg-green-500',
      },
    ]);
  
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [startLeft, setStartLeft] = useState<number>(0);
    const [startWidth, setStartWidth] = useState<number>(0);
    
    const containerRef = useRef<HTMLDivElement>(null);
  
    // Constants
    const HOUR_WIDTH = 100;
    const START_HOUR = 8;
    const END_HOUR = 18;
  
    const formatHour = (hour: number): string => {
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}${suffix}`;
    };
  
    const hours: number[] = Array.from(
      { length: END_HOUR - START_HOUR + 1 }, 
      (_, i) => i + START_HOUR
    );
  
    const calculatePosition = (date: Date): number => {
      const taskHour = date.getHours();
      const taskMinutes = date.getMinutes();
      return ((taskHour - START_HOUR) + (taskMinutes / 60)) * HOUR_WIDTH;
    };
  
    const calculateWidth = (duration: number): number => {
      return duration * HOUR_WIDTH;
    };
  
    const handleMouseDown = (
      e: React.MouseEvent<HTMLDivElement>, 
      task: Task, 
      isResize: boolean = false
    ): void => {
      if (isResize) {
        e.stopPropagation();
        setIsResizing(true);
      } else {
        setIsDragging(true);
      }
      
      const taskElement = e.currentTarget;
      const rect = taskElement.getBoundingClientRect();
      const parentRect = taskElement.parentElement?.getBoundingClientRect();
      
      if (parentRect) {
        setActiveTask(task);
        setStartX(e.clientX);
        setStartLeft(rect.left - parentRect.left);
        setStartWidth(rect.width);
      }
    };
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!activeTask || (!isDragging && !isResizing)) return;
  
      const deltaX = e.clientX - startX;
  
      if (isDragging) {
        let newLeft = startLeft + deltaX;
        const snappedHour = Math.round(newLeft / HOUR_WIDTH);
        const newHour = snappedHour + START_HOUR;
  
        if (newHour >= START_HOUR && newHour <= END_HOUR - activeTask.duration) {
          setTasks(tasks.map(t => {
            if (t.id === activeTask.id) {
              const newStart = new Date(t.start);
              newStart.setHours(newHour);
              newStart.setMinutes(0);
              return { ...t, start: newStart };
            }
            return t;
          }));
        }
      }
  
      if (isResizing) {
        let newWidth = Math.max(HOUR_WIDTH, startWidth + deltaX);
        const newDuration = Math.round(newWidth / HOUR_WIDTH);
        const endHour = activeTask.start.getHours() + newDuration;
  
        if (endHour <= END_HOUR) {
          setTasks(tasks.map(t => {
            if (t.id === activeTask.id) {
              return { ...t, duration: newDuration };
            }
            return t;
          }));
        }
      }
    };
  
    const handleMouseUp = (): void => {
      setActiveTask(null);
      setIsDragging(false);
      setIsResizing(false);
    };
  
    const addNewTask = (): void => {
      const colors = ['blue', 'green', 'purple', 'orange'];
      const newTask: Task = {
        id: String(tasks.length + 1),
        title: `Task ${tasks.length + 1}`,
        start: new Date(2024, 9, 1, START_HOUR),
        duration: 2,
        color: `bg-${colors[tasks.length % colors.length]}-500`,
      };
      setTasks([...tasks, newTask]);
    };
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Gantt Calendar</h1>
        
        {/* Time Header */}
        <div className="relative mb-4 border-b">
          <div className="flex">
            <div className="w-32">Task</div>
            <div className="flex flex-1">
              {hours.map(hour => (
                <div
                  key={hour}
                  className="flex-none w-[100px] text-sm text-gray-600 text-center border-l"
                >
                  {formatHour(hour)}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Tasks Container */}
        <div 
          ref={containerRef} 
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Task Rows */}
          {tasks.map(task => (
            <div key={task.id} className="flex items-center mb-4 group">
              <div className="w-32 text-sm">{task.title}</div>
              <div className="relative flex-1 h-8">
                {/* Task Bar */}
                <div
                  className={`absolute h-full rounded cursor-move ${task.color} 
                    hover:opacity-90 transition-opacity select-none`}
                  style={{
                    left: `${calculatePosition(task.start)}px`,
                    width: `${calculateWidth(task.duration)}px`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, task)}
                >
                  <div className="px-2 text-xs text-white truncate">
                    {`${formatHour(task.start.getHours())} - ${formatHour(task.start.getHours() + task.duration)}`}
                  </div>
                  {/* Resize Handle */}
                  <div
                    className="absolute top-0 right-0 w-2 h-full cursor-e-resize 
                      bg-black bg-opacity-20 opacity-0 group-hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown(e, task, true)}
                  />
                </div>
              </div>
            </div>
          ))}
  
          {/* Time Grid Lines */}
          <div className="absolute top-0 left-32 right-0 bottom-0">
            {hours.map(hour => (
              <div
                key={hour}
                className="absolute top-0 bottom-0 w-px bg-gray-200"
                style={{ left: `${(hour - START_HOUR) * HOUR_WIDTH}px` }}
              />
            ))}
          </div>
        </div>
  
        {/* Add Task Button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
            transition-colors"
          onClick={addNewTask}
        >
          Add Task
        </button>
      </div>
    );
  };
  
  export default GanttCalendar;