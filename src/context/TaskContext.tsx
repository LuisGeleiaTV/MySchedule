import React, { createContext, useContext, useState, useEffect } from 'react';

export type TaskType = 'trabalho' | 'estudo' | 'lazer' | 'outros' | 'academia' | 'almoco' | 'cafe' | 'reuniao';

export interface Task {
  id: string;
  title: string;
  type: string;
  notes: string;
  completed: boolean;
  // Campos específicos para tarefas da agenda
  startTime?: string;
  endTime?: string;
  days?: string[];
  gridPosition?: number;
  // Campo para identificar o tipo de tarefa
  source: 'independent' | 'schedule';
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  addTasks: (tasks: Task[]) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
}

const STORAGE_KEY = 'myschedule_tasks';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar tarefas do localStorage quando o componente montar
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        console.log('Carregando tarefas:', parsedTasks); // Debug
        setTasks(parsedTasks);
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }, []);

  // Salvar tarefas no localStorage sempre que mudarem
  useEffect(() => {
    if (isInitialized) {
      try {
        console.log('Salvando tarefas:', tasks); // Debug
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
      }
    }
  }, [tasks, isInitialized]);

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks(prev => [...prev, { ...task, id: crypto.randomUUID() }]);
  };

  const addTasks = (newTasks: Task[]) => {
    setTasks(prev => [...prev, ...newTasks]);
  };

  const deleteTask = (id: string) => {
    console.log('Deletando tarefa:', id); // Debug
    setTasks(prev => {
      const updated = prev.filter(task => task.id !== id);
      console.log('Novo estado de tarefas:', updated); // Debug
      return updated;
    });
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  if (!isInitialized) {
    return null; // ou um loading spinner
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, addTasks, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
}; 