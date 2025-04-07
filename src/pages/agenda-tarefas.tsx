import React, { useState } from 'react';
import { useTasks, Task } from '@/context/TaskContext';
import TaskList from '@/components/TaskList';

const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const AgendaTasks = () => {
  const { tasks, updateTask } = useTasks();
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const scheduleTasks = tasks.filter(task => task.source === 'schedule');

  const tasksByDay = weekDays.map((day, index) => {
    const dayTasks = scheduleTasks.filter(task =>
      task.days?.includes(day) && !task.completed
    );
    return {
      day,
      tasks: dayTasks
    };
  });

  const handleComplete = (task: Task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Tarefas da Agenda</h1>
        </div>

        {/* Seletor de Dia */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {weekDays.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(index)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedDay === index
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Lista de Tarefas do Dia */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            {weekDays[selectedDay]}
          </h2>
          <TaskList
            tasks={tasksByDay[selectedDay].tasks}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default AgendaTasks; 