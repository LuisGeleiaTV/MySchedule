import React from 'react';
import { Task } from '@/context/TaskContext';
import { useTasks } from '@/context/TaskContext';

const TaskOverview: React.FC = () => {
  const { tasks: allTasks, updateTask } = useTasks();

  // Get today's tasks
  const today = new Date().toISOString().split('T')[0];
  const tasks = {
    today: allTasks.filter(task => !task.completed && task.days?.includes(today)),
    overdue: allTasks.filter(task => !task.completed && task.days?.some(day => day < today)),
    upcoming: allTasks.filter(task => !task.completed && task.days?.some(day => day > today))
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="grid grid-cols-1 divide-y dark:divide-gray-700">
        {/* Tarefas de Hoje */}
        <TaskSection
          title="Hoje"
          icon="📅"
          tasks={tasks.today}
          emptyMessage="Nenhuma tarefa para hoje"
          onComplete={updateTask}
        />

        {/* Tarefas Atrasadas */}
        <TaskSection
          title="Atrasadas"
          icon="⚠️"
          tasks={tasks.overdue}
          emptyMessage="Nenhuma tarefa atrasada"
          variant="danger"
          onComplete={updateTask}
        />

        {/* Próximas Tarefas */}
        <TaskSection
          title="Próximas"
          icon="🔜"
          tasks={tasks.upcoming}
          emptyMessage="Nenhuma tarefa próxima"
          variant="info"
          onComplete={updateTask}
        />
      </div>
    </div>
  );
};

interface TaskSectionProps {
  title: string;
  icon: string;
  tasks: Task[];
  emptyMessage: string;
  variant?: 'default' | 'danger' | 'info';
  onComplete?: (task: Task) => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  title,
  icon,
  tasks,
  emptyMessage,
  variant = 'default',
  onComplete
}) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
        <span className="mr-2">{icon}</span> {title}
        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          ({tasks.length})
        </span>
      </h2>
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              variant={variant}
              onComplete={onComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  variant?: 'default' | 'danger' | 'info';
  onComplete?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, variant = 'default', onComplete }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return 'border-red-100 dark:border-red-900/30';
      case 'info':
        return 'border-blue-100 dark:border-blue-900/30';
      default:
        return 'border-gray-100 dark:border-gray-700/50';
    }
  };

  const getTimeStyles = () => {
    switch (variant) {
      case 'danger':
        return 'text-red-600 dark:text-red-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-purple-600 dark:text-purple-400';
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete({ ...task, completed: !task.completed });
    }
  };

  return (
    <div className={`p-3 rounded-lg border ${getVariantStyles()} bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
            onChange={handleComplete}
          />
          <div className="flex items-center gap-2">
            <span className="text-xl">{task.type}</span>
            <span className={`text-gray-800 dark:text-white ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}>
              {task.title}
            </span>
          </div>
        </div>
        {task.startTime && task.endTime && (
          <span className={`text-xs font-medium ${getTimeStyles()}`}>
            {task.startTime} - {task.endTime}
          </span>
        )}
      </div>
      {task.notes && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-8">
          {task.notes}
        </p>
      )}
    </div>
  );
};

export default TaskOverview; 