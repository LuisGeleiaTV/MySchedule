import React, { useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import { EmojiPicker } from '@/components/EmojiPicker';

interface TaskFormData {
  title: string;
  type: string;
  notes: string;
}

const initialTaskForm: TaskFormData = {
  title: '',
  type: '📝',
  notes: ''
};

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [taskForm, setTaskForm] = useState<TaskFormData>(initialTaskForm);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleSubmit = () => {
    if (taskForm.title.trim()) {
      addTask({
        ...taskForm,
        id: crypto.randomUUID(),
        completed: false,
        days: [],
        startTime: '',
        endTime: '',
        gridPosition: 0
      });
      setTaskForm(initialTaskForm);
      setShowForm(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Tarefas</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Tarefa
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${filter === 'pending'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${filter === 'completed'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            Concluídas
          </button>
        </div>

        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-lg transition-all duration-200 group ${task.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                  : 'bg-white dark:bg-gray-800 border-l-4 border-purple-500'
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => updateTask({ ...task, completed: !task.completed })}
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
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Nenhuma tarefa encontrada
            </div>
          )}
        </div>
      </div>

      {/* Modal de nova tarefa */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowForm(false);
            setShowEmojiPicker(false);
          }}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Ícone</label>
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="w-10 h-10 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-xl"
                  >
                    {taskForm.type}
                  </button>
                  {showEmojiPicker && (
                    <EmojiPicker
                      onSelect={(emoji) => {
                        setTaskForm({ ...taskForm, type: emoji });
                        setShowEmojiPicker(false);
                      }}
                      onClose={() => setShowEmojiPicker(false)}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    placeholder="Digite o título da tarefa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notas</label>
                <textarea
                  value={taskForm.notes}
                  onChange={e => setTaskForm({ ...taskForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  rows={3}
                  placeholder="Adicionar notas (opcional)"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!taskForm.title.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks; 