// pages/index.tsx
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Grid from '../components/Grid';
import GanttBar from '../components/GanttBar';

const tasks = [
  { id: 1, name: 'Task 1', duration: 150 },
  { id: 2, name: 'Task 2', duration: 200 },
];

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Gantt Calendar</h1>
        <Grid />
        <div className="mt-4 space-y-2">
          {tasks.map((task) => (
            <GanttBar key={task.id} task={task} />
          ))}
        </div>
      </main>
    </DndProvider>
  );
}
