import React from 'react';
import { useTasks } from '../context/TaskContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { tasks } = useTasks();
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const today = weekDays[now.getDay() - 1];

  // Tarefas de hoje
  const todayTasks = tasks.filter(task =>
    task.days.includes(today)
  ).sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Tarefas atrasadas (tarefas que já passaram do horário)
  const overdueTasks = todayTasks.filter(task => task.startTime < currentTime);

  // Próximas tarefas (próximas 3 tarefas que ainda não começaram)
  const upcomingTasks = todayTasks
    .filter(task => task.startTime > currentTime)
    .slice(0, 3);

  // Dados para o gráfico
  const tasksByDay = weekDays.map(day => ({
    day,
    total: tasks.filter(task => task.days.includes(day)).length,
    completed: tasks.filter(task => task.days.includes(day) && task.startTime < currentTime).length
  }));

  const chartData = {
    labels: weekDays,
    datasets: [
      {
        label: 'Tarefas Pendentes',
        data: tasksByDay.map(day => day.total - day.completed),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tarefas Concluídas',
        data: tasksByDay.map(day => day.completed),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tarefas da Semana',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Cálculo do tempo total de tarefas hoje
  const totalMinutesToday = todayTasks.reduce((acc, task) => {
    const [startHour, startMin] = task.startTime.split(':').map(Number);
    const [endHour, endMin] = task.endTime.split(':').map(Number);
    const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    return acc + duration;
  }, 0);

  const hoursToday = Math.floor(totalMinutesToday / 60);
  const minutesToday = totalMinutesToday % 60;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {today}, {currentTime}
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card de Hoje */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hoje
          </h2>
          <div className="space-y-3">
            {todayTasks.length > 0 ? (
              todayTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border ${task.startTime < currentTime
                      ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {task.startTime} - {task.endTime}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nenhuma tarefa para hoje
              </p>
            )}
          </div>
        </div>

        {/* Card de Atrasados */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
            Atrasados
          </h2>
          <div className="space-y-3">
            {overdueTasks.length > 0 ? (
              overdueTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border border-red-200 dark:border-red-800/30 bg-red-50/50 dark:bg-red-900/20"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium text-red-900 dark:text-red-300">
                      {task.title}
                    </span>
                  </div>
                  <div className="text-xs text-red-600/75 dark:text-red-400/75 mt-1">
                    {task.startTime} - {task.endTime}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nenhuma tarefa atrasada
              </p>
            )}
          </div>
        </div>

        {/* Card de Próximos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
            Próximos
          </h2>
          <div className="space-y-3">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border border-blue-200 dark:border-blue-800/30 bg-blue-50/50 dark:bg-blue-900/20"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                      {task.title}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600/75 dark:text-blue-400/75 mt-1">
                    {task.startTime} - {task.endTime}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nenhuma tarefa próxima
              </p>
            )}
          </div>
        </div>

        {/* Card de Tempo Total */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tempo Total Hoje
          </h2>
          <div className="flex items-center justify-center h-24">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {hoursToday}h {minutesToday}min
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard; 