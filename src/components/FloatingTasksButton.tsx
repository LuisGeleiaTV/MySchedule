import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Task } from '@/context/TaskContext';

interface FloatingTasksButtonProps {
  tasks: Task[];
}

const FloatingTasksButton: React.FC<FloatingTasksButtonProps> = ({ tasks }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push('/tasks');
  };

  const pendingTasks = tasks.filter(task => task.source === 'independent' && !task.completed).length;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      {pendingTasks > 0 && (
        <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
          {pendingTasks}
        </span>
      )}
      {isHovered && (
        <span className="absolute right-0 bottom-16 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap">
          Ver Tarefas
        </span>
      )}
    </button>
  );
};

export default FloatingTasksButton; 