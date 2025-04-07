import React, { useState, useEffect } from 'react';

const FocusTime: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!selectedTask && !isRunning) {
      // TODO: Mostrar alerta para selecionar uma tarefa
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setSelectedTask('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Timer de Foco
      </h2>

      <div className="space-y-4">
        {/* Seletor de Tarefa */}
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-white border-0 focus:ring-2 focus:ring-purple-500"
          disabled={isRunning}
        >
          <option value="">Selecione uma tarefa</option>
          <option value="1">Projeto A</option>
          <option value="2">Reunião de equipe</option>
          <option value="3">Estudar React</option>
        </select>

        {/* Timer Display */}
        <div className="text-center py-6">
          <div className="text-4xl font-mono font-bold text-gray-800 dark:text-white">
            {formatTime(time)}
          </div>
        </div>

        {/* Controles */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStartStop}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${isRunning
                ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
              }`}
          >
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Resetar
          </button>
        </div>

        {/* Estatísticas */}
        <div className="pt-4 border-t dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hoje
              </div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                2h 45m
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Semana
              </div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                12h 30m
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTime; 