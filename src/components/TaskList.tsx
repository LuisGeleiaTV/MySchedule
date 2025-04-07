import React from 'react';
import { Task } from '@/context/TaskContext';

interface TaskListProps {
  tasks: Task[];
  onComplete?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`p-4 rounded-lg transition-all duration-200 group ${task.completed
            ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
            : 'bg-white dark:bg-gray-800 border-l-4 border-purple-500'
            }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {onComplete && (
                <button
                  onClick={() => onComplete(task)}
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
                    }`}
                >
                  {task.completed && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{task.type}</span>
                  <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                    {task.title}
                  </h3>
                </div>
                {task.notes && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{task.notes}</p>
                )}
                {task.startTime && task.endTime && (
                  <p className="mt-1 text-sm text-purple-600 dark:text-purple-400">
                    {task.startTime} - {task.endTime}
                  </p>
                )}
              </div>
            </div>
            {onDelete && (
              <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Nenhuma tarefa encontrada
        </div>
      )}
    </div>
  );
};

export default TaskList; 