import React from 'react';

const WeeklyProgress: React.FC = () => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const data = [
    { completed: 5, total: 7 },
    { completed: 4, total: 6 },
    { completed: 6, total: 8 },
    { completed: 3, total: 5 },
    { completed: 7, total: 9 },
    { completed: 2, total: 4 },
    { completed: 1, total: 3 },
  ];

  const totalCompleted = data.reduce((acc, day) => acc + day.completed, 0);
  const totalTasks = data.reduce((acc, day) => acc + day.total, 0);
  const weeklyPercentage = Math.round((totalCompleted / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Gráfico */}
      <div className="flex justify-between items-end h-28">
        {data.map((day, index) => {
          const percentage = (day.completed / day.total) * 100;
          const isToday = index === new Date().getDay();

          return (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div className="w-full px-1">
                <div className="relative h-20 w-full bg-gray-100 dark:bg-gray-700/30 rounded-lg overflow-hidden">
                  <div
                    className={`absolute bottom-0 w-full transition-all duration-500 rounded-lg ${isToday
                        ? 'bg-purple-500/70'
                        : 'bg-purple-500/40'
                      }`}
                    style={{ height: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className={`text-xs font-medium ${isToday
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400'
                }`}>
                {days[index]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Estatísticas */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500/70" />
            <span className="text-gray-600 dark:text-gray-400">Hoje</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500/40" />
            <span className="text-gray-600 dark:text-gray-400">Outros dias</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400">
            {totalCompleted} de {totalTasks} tarefas
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            {weeklyPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgress; 