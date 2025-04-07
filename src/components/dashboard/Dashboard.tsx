import React from 'react';
import { useTasks } from '@/context/TaskContext';
import TaskOverview from './TaskOverview';
import QuickAdd from './QuickAdd';

const Dashboard: React.FC = () => {
  const { tasks } = useTasks();
  const today = new Date().toISOString().split('T')[0];

  // Calcular estatísticas
  const todayTasks = tasks.filter(task => !task.completed && task.days?.includes(today));
  const completedTasks = tasks.filter(task => task.completed);
  const overdueTasks = tasks.filter(task => !task.completed && task.days?.some(day => day < today));

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Seção Superior - Cards de Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
        <StatCard
          title="Tarefas Hoje"
          value={todayTasks.length.toString()}
          icon="📋"
        />
        <StatCard
          title="Concluídas"
          value={completedTasks.length.toString()}
          icon="✅"
        />
        <StatCard
          title="Atrasadas"
          value={overdueTasks.length.toString()}
          icon="⚠️"
        />
      </div>

      {/* Layout Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Coluna Esquerda - Tarefas */}
        <div className="lg:col-span-2">
          <TaskOverview />
        </div>

        {/* Coluna Direita - Quick Add */}
        <div className="hidden lg:flex flex-col space-y-6">
          <QuickAdd />
        </div>

        {/* Quick Add em Mobile */}
        <div className="lg:hidden">
          <QuickAdd />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl sm:text-2xl">{icon}</span>
      </div>
      <div className="space-y-0.5 sm:space-y-1">
        <h3 className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{title}</h3>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Dashboard; 