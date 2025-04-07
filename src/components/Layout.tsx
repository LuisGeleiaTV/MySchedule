import React from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';
import { useTasks, Task } from '@/context/TaskContext';
import FloatingTasksButton from './FloatingTasksButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { tasks } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
      <FloatingTasksButton tasks={tasks} />
    </div>
  );
};

export default Layout; 