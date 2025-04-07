import React, { useState, useEffect, useRef } from 'react';
import { useTasks } from '@/context/TaskContext';
import { useDefaultEvents, DefaultEvent } from '@/context/DefaultEventsContext';
import { format, startOfWeek, addDays, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Task } from '@/context/TaskContext';
import { EmojiPicker } from './EmojiPicker';

interface TaskDetails {
  task: Task;
  initialTime: string;
  position?: { x: number; y: number };
}

interface ResizingTask {
  task: Task;
  type: 'start' | 'end';
  initialY: number;
  initialTime: string;
}

interface DraggingTask {
  task: Task;
  initialPosition: number;
  mouseOffset: {
    x: number;
    y: number;
  };
}

interface DraggingDefaultEvent extends DefaultEvent {
  mouseOffset: {
    x: number;
    y: number;
  };
}

interface DefaultEventFormData {
  id?: string;
  name: string;
  title: string;
  type: string;
  startTime: string;
  endTime: string;
  notes: string;
  completed: boolean;
  gridPosition: number;
  weekDays: number[];
  source: 'schedule';
}

const TaskEditDialog: React.FC<{
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}> = ({ task, onClose, onSave, onDelete }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Editar Tarefa</h2>

        <div className="space-y-4">
          <div className="flex gap-2 items-start">
            <div>
              <label className="block text-sm font-medium mb-1">Ícone</label>
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-xl hover:bg-gray-700 transition-colors"
                >
                  {editedTask.type}
                </button>
                {showEmojiPicker && (
                  <EmojiPicker
                    onSelect={(emoji) => {
                      setEditedTask({ ...editedTask, type: emoji });
                      setShowEmojiPicker(false);
                    }}
                    onClose={() => setShowEmojiPicker(false)}
                  />
                )}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                value={editedTask.title}
                onChange={e => setEditedTask({ ...editedTask, title: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Horário</label>
            <div className="flex gap-2">
              <input
                type="time"
                value={editedTask.startTime}
                onChange={e => setEditedTask({ ...editedTask, startTime: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-gray-400 self-center">até</span>
              <input
                type="time"
                value={editedTask.endTime}
                onChange={e => setEditedTask({ ...editedTask, endTime: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => onDelete(task.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Excluir
            </button>
            <button
              onClick={() => onSave(editedTask)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const initialTask: Omit<Task, 'id'> = {
  title: '',
  type: '📝',
  notes: '',
  completed: false,
  source: 'schedule',
  startTime: '',
  endTime: '',
  days: [],
  gridPosition: 0
};

const weekDayOptions = [
  { value: 0, label: 'Dom' },
  { value: 1, label: 'Seg' },
  { value: 2, label: 'Ter' },
  { value: 3, label: 'Qua' },
  { value: 4, label: 'Qui' },
  { value: 5, label: 'Sex' },
  { value: 6, label: 'Sáb' }
] as const;

type WeekDay = (typeof weekDayOptions)[number]['value'];

const initialDefaultEvent: DefaultEventFormData = {
  name: '',
  title: '',
  type: '📝',
  startTime: '09:00',
  endTime: '10:00',
  notes: '',
  completed: false,
  gridPosition: 0,
  weekDays: [],
  source: 'schedule'
};

const getDayInCurrentWeek = (weekDay: WeekDay, currentDate: Date = new Date()) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  return format(addDays(weekStart, weekDay), 'yyyy-MM-dd');
};

// Organizar emojis por categorias
const emojiCategories = [
  {
    name: 'Trabalho',
    emojis: ['💻', '📝', '💼', '📊', '📱']
  },
  {
    name: 'Estudo',
    emojis: ['📚', '✏️', '🎓', '📖', '🧠']
  },
  {
    name: 'Saúde',
    emojis: ['🏋️', '🧘', '🏃', '💆', '🍎']
  },
  {
    name: 'Social',
    emojis: ['👥', '🤝', '🎉', '💃', '🎭']
  },
  {
    name: 'Lazer',
    emojis: ['🎮', '🎨', '🎵', '🎬', '⚽']
  },
  {
    name: 'Rotina',
    emojis: ['☕', '🍽️', '🏠', '🛒', '🚗']
  }
];

const DefaultEventDialog: React.FC<{
  event?: DefaultEvent;
  onClose: () => void;
  onSave: (event: DefaultEventFormData) => void;
  onDelete?: (event: DefaultEvent) => void;
}> = ({ event, onClose, onSave, onDelete }) => {
  const [editedEvent, setEditedEvent] = useState<DefaultEventFormData>(
    event ? {
      id: event.id,
      name: event.name,
      title: event.title,
      type: event.type,
      startTime: event.startTime || '09:00',
      endTime: event.endTime || '10:00',
      notes: event.notes,
      completed: event.completed,
      gridPosition: event.gridPosition || 0,
      weekDays: event.weekDays,
      source: 'schedule'
    } : initialDefaultEvent
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    if (!editedEvent.name || !editedEvent.title || !editedEvent.startTime || !editedEvent.endTime || editedEvent.weekDays.length === 0) {
      return;
    }
    onSave(editedEvent);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">{event ? 'Editar Evento Padrão' : 'Novo Evento Padrão'}</h2>

        <div className="space-y-4">
          <div className="flex gap-2 items-start">
            <div>
              <label className="block text-sm font-medium mb-1">Ícone</label>
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-xl hover:bg-gray-700 transition-colors"
                >
                  {editedEvent.type}
                </button>
                {showEmojiPicker && (
                  <EmojiPicker
                    onSelect={(emoji) => {
                      setEditedEvent({ ...editedEvent, type: emoji });
                      setShowEmojiPicker(false);
                    }}
                    onClose={() => setShowEmojiPicker(false)}
                  />
                )}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                value={editedEvent.name}
                onChange={e => setEditedEvent({ ...editedEvent, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ex: Academia diária"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={editedEvent.title}
              onChange={e => setEditedEvent({ ...editedEvent, title: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: Academia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Horário</label>
            <div className="flex gap-2">
              <input
                type="time"
                value={editedEvent.startTime}
                onChange={e => setEditedEvent({ ...editedEvent, startTime: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-gray-400 self-center">até</span>
              <input
                type="time"
                value={editedEvent.endTime}
                onChange={e => setEditedEvent({ ...editedEvent, endTime: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dias da Semana</label>
            <div className="flex flex-wrap gap-2">
              {weekDayOptions.map(day => (
                <button
                  key={day.value}
                  onClick={() => {
                    setEditedEvent(prev => ({
                      ...prev,
                      weekDays: prev.weekDays.includes(day.value)
                        ? prev.weekDays.filter(d => d !== day.value)
                        : [...prev.weekDays, day.value]
                    }));
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${editedEvent.weekDays.includes(day.value)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notas</label>
            <textarea
              value={editedEvent.notes}
              onChange={e => setEditedEvent({ ...editedEvent, notes: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="Adicionar notas (opcional)"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {onDelete && event && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Excluir
              </button>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              disabled={!editedEvent.name || !editedEvent.title || !editedEvent.startTime || !editedEvent.endTime || editedEvent.weekDays.length === 0}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Schedule: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { defaultEvents, addDefaultEvent, removeDefaultEvent, updateDefaultEvent } = useDefaultEvents();
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showDefaultEventForm, setShowDefaultEventForm] = useState(false);
  const [showDefaultEventsList, setShowDefaultEventsList] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>(initialTask);
  const [newDefaultEvent, setNewDefaultEvent] = useState<DefaultEventFormData>(initialDefaultEvent);
  const [showTaskDetails, setShowTaskDetails] = useState<TaskDetails | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentEmojiCategory, setCurrentEmojiCategory] = useState(0);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState<{ x: number; y: number } | null>(null);
  const [draggingTask, setDraggingTask] = useState<{
    task: Task;
    initialPosition: number;
    mouseOffset: { x: number; y: number };
  } | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [draggingDefaultEvent, setDraggingDefaultEvent] = useState<DraggingDefaultEvent | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfCurrentWeek, i);
    return {
      short: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'][i],
      full: format(date, 'yyyy-MM-dd'),
      display: format(date, 'd MMM', { locale: ptBR })
    };
  });

  const gridSlots = Array.from({ length: 12 }, (_, i) => i);

  const getWeekDayFromDate = (date: string) => {
    const dayIndex = new Date(date).getDay();
    return weekDayOptions[dayIndex].value;
  };

  const getTaskColor = (type: string | undefined, completed: boolean) => {
    if (completed) {
      return 'bg-green-500/20 dark:bg-green-900/30 border-l-4 border-green-600 dark:border-green-700 hover:bg-green-500/30 dark:hover:bg-green-800/40';
    }
    return 'bg-gray-100 dark:bg-gray-800/50 border-l-4 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700/50';
  };

  const getTaskIcon = (type: string | undefined) => {
    switch (type) {
      case 'trabalho':
        return '💼';
      case 'estudo':
        return '📚';
      case 'lazer':
        return '🎮';
      case 'academia':
        return '🏃';
      case 'almoco':
        return '🍽️';
      case 'cafe':
        return '☕';
      case 'reuniao':
        return '👥';
      default:
        return '📝';
    }
  };

  const toggleDay = (day: string) => {
    setNewTask(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleCellClick = (day: string, gridIndex: number, e: React.MouseEvent) => {
    setNewTask({
      ...initialTask,
      startTime: '',
      endTime: '',
      days: [day],
      gridPosition: gridIndex
    });
    setShowNewTaskForm(true);
  };

  const handleCreateTask = () => {
    if (newTask.title && newTask.days.length > 0) {
      // Criar uma tarefa independente para cada dia selecionado
      newTask.days.forEach(day => {
        addTask({
          ...newTask,
          days: [day], // Cada tarefa tem apenas um dia
          gridPosition: newTask.gridPosition
        });
      });
      setShowNewTaskForm(false);
      setNewTask(initialTask);
      // Update suggestions after adding new tasks
      setTitleSuggestions(getFrequentTitles());
    }
  };

  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask({ ...task, completed: !task.completed });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    if (taskToDelete) {
      setDeletedTasks(prev => [taskToDelete, ...prev].slice(0, 10)); // Store up to 10 recently deleted tasks
    }
    deleteTask(taskId);
  };

  const handleUndoDelete = () => {
    if (deletedTasks.length > 0) {
      const [taskToRestore, ...remainingDeletedTasks] = deletedTasks;
      addTask(taskToRestore);
      setDeletedTasks(remainingDeletedTasks);
    }
  };

  const tasksByDay = weekDays.reduce((acc, day) => {
    acc[day.full] = tasks.filter(task => task.days.includes(day.full))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {} as Record<string, Task[]>);

  const handleTaskClick = (task: Task, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedTask(task);
  };

  const handleSaveTask = (updatedTask: Task) => {
    updateTask(updatedTask);
    setSelectedTask(null);
  };

  const getCurrentWeek = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  };

  const handleAddDefaultEvent = (event: DefaultEvent) => {
    const weekDayOptions = [
      { value: 0, label: 'Domingo' },
      { value: 1, label: 'Segunda' },
      { value: 2, label: 'Terça' },
      { value: 3, label: 'Quarta' },
      { value: 4, label: 'Quinta' },
      { value: 5, label: 'Sexta' },
      { value: 6, label: 'Sábado' }
    ];

    const getDayInCurrentWeek = (weekDay: number) => {
      const today = new Date();
      const currentDay = today.getDay();
      const diff = weekDay - currentDay;
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + diff);
      return targetDate.toISOString().split('T')[0];
    };

    event.weekDays.forEach(weekDay => {
      const day = getDayInCurrentWeek(weekDay);
      const dayTasks = tasks.filter(task => task.days?.includes(day));
      const firstEmptyPosition = Math.max(0, ...dayTasks.map(task => task.gridPosition || 0)) + 1;

      const newTask: Omit<Task, 'id'> = {
        title: event.title,
        type: event.type,
        notes: event.notes,
        completed: false,
        source: 'schedule',
        startTime: event.startTime,
        endTime: event.endTime,
        days: [day],
        gridPosition: firstEmptyPosition
      };

      addTask(newTask);
    });

    setShowDefaultEventsList(false);
  };

  const isToday = (date: string) => {
    return format(new Date(), 'yyyy-MM-dd') === date;
  };

  const getTaskPosition = (gridIndex: number) => {
    return {
      top: `${gridIndex * 48}px`, // 48px é a altura de cada célula
      height: '48px' // Altura fixa de uma célula
    };
  };

  const handleDragStart = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggingTask({
      task,
      initialPosition: task.gridPosition,
      mouseOffset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = (day: string, gridIndex: number) => {
    if (draggingTask) {
      const updatedTask = {
        ...draggingTask.task,
        days: [day],
        gridPosition: gridIndex
      };
      updateTask(updatedTask);
      setDraggingTask(null);
      setMousePosition(null);
    }
  };

  const handleDefaultEventDragStart = (event: DefaultEvent, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggingDefaultEvent({
      ...event,
      mouseOffset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleDefaultEventDragEnd = (day: string, gridIndex: number) => {
    if (draggingDefaultEvent) {
      // Add a task for the dropped default event
      addTask({
        title: draggingDefaultEvent.title,
        type: draggingDefaultEvent.type,
        startTime: draggingDefaultEvent.startTime,
        endTime: draggingDefaultEvent.endTime,
        notes: draggingDefaultEvent.notes,
        completed: false,
        gridPosition: gridIndex,
        days: [day]
      });

      setDraggingDefaultEvent(null);
      setMousePosition(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingTask || draggingDefaultEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (draggingTask) {
      setDraggingTask(null);
      setMousePosition(null);
    }
    if (draggingDefaultEvent) {
      setDraggingDefaultEvent(null);
      setMousePosition(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (draggingTask) {
          setDraggingTask(null);
          setMousePosition(null);
        }
        if (draggingDefaultEvent) {
          setDraggingDefaultEvent(null);
          setMousePosition(null);
        }
      }

      // Ctrl+Z handler for undo delete
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndoDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingTask, draggingDefaultEvent, deletedTasks]);

  const handleEmojiButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Function to get unique titles from tasks and sort by frequency
  const getFrequentTitles = () => {
    const titleCounts: Record<string, number> = {};
    tasks.forEach(task => {
      if (task.title) {
        titleCounts[task.title] = (titleCounts[task.title] || 0) + 1;
      }
    });

    return Object.keys(titleCounts)
      .sort((a, b) => titleCounts[b] - titleCounts[a])
      .slice(0, 5); // Get top 5 most frequent titles
  };

  // Update suggestions when tasks change
  useEffect(() => {
    setTitleSuggestions(getFrequentTitles());
  }, [tasks]);

  // Filter suggestions based on current input
  const getFilteredSuggestions = (input: string) => {
    if (!input) return titleSuggestions;
    const inputLower = input.toLowerCase();
    return titleSuggestions.filter(
      title => title.toLowerCase().includes(inputLower)
    );
  };

  // Find the first empty slot in a day
  const findFirstEmptySlot = (day: string) => {
    const dayTasks = tasks.filter(task => task.days.includes(day));
    const occupiedSlots = dayTasks.map(task => task.gridPosition);

    // Find the first empty slot from top to bottom
    for (let i = 0; i < gridSlots.length; i++) {
      if (!occupiedSlots.includes(i)) {
        return i;
      }
    }

    // If all slots are occupied, use the last slot
    return gridSlots.length - 1;
  };

  // Add a default event to a specific day
  const addDefaultEventToDay = (event: DefaultEvent, day: string) => {
    const gridPosition = findFirstEmptySlot(day);

    addTask({
      title: event.title,
      type: event.type,
      startTime: event.startTime,
      endTime: event.endTime,
      notes: event.notes,
      completed: false,
      gridPosition: gridPosition,
      days: [day]
    });
  };

  // Handle click on a default event in the list
  const handleDefaultEventClick = (event: DefaultEvent) => {
    // Only add events to the current week displayed on screen
    const currentWeekDates = weekDays.map(day => day.full);

    // Go through each weekday marked in the default event
    event.weekDays.forEach(weekDay => {
      // Find the corresponding date in the current week for this weekday
      const weekDayNumber = weekDay as WeekDay;
      const dateInCurrentWeek = currentWeekDates[weekDayNumber];

      if (dateInCurrentWeek) {
        // Find the first empty slot for this day
        const gridPosition = findFirstEmptySlot(dateInCurrentWeek);

        // Add the task to this day at the first empty position
        addTask({
          title: event.title,
          type: event.type,
          startTime: event.startTime,
          endTime: event.endTime,
          notes: event.notes,
          completed: false,
          gridPosition: gridPosition,
          days: [dateInCurrentWeek]
        });
      }
    });

    // Close the events list
    setShowDefaultEventsList(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Navegação da semana e eventos padrão */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <button
            onClick={() => setSelectedDate(prev => addDays(prev, -7))}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            Semana Anterior
          </button>
          <span className="text-base font-semibold text-center">
            {format(startOfCurrentWeek, "d 'de' MMMM", { locale: ptBR })} - {format(addDays(startOfCurrentWeek, 6), "d 'de' MMMM", { locale: ptBR })}
          </span>
          <button
            onClick={() => setSelectedDate(prev => addDays(prev, 7))}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            Próxima Semana
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowDefaultEventsList(!showDefaultEventsList)}
              className="px-3 py-1.5 text-sm bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-all duration-200 flex items-center gap-2"
            >
              <span>Eventos Padrão</span>
              <svg className={`w-4 h-4 transition-transform duration-200 ${showDefaultEventsList ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDefaultEventsList && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDefaultEventsList(false)}
                />
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 w-80 transform transition-all duration-200 ease-in-out animate-fade-in">
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span className="font-medium">Eventos Padrão</span>
                    <button
                      onClick={() => {
                        setShowDefaultEventForm(true);
                        setShowDefaultEventsList(false);
                      }}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                    >
                      + Novo
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-2">
                    {defaultEvents.map(event => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group"
                      >
                        <div
                          className="flex items-center gap-2 flex-1 text-left cursor-pointer"
                          onClick={() => handleDefaultEventClick(event)}
                        >
                          <span className="text-xl">{event.type}</span>
                          <div>
                            <div className="font-medium">{event.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {event.startTime} - {event.endTime}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {event.weekDays.map(day => weekDayOptions.find(opt => opt.value === day)?.label).join(', ')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDefaultEventForm(true);
                              setShowDefaultEventsList(false);
                              setNewDefaultEvent({
                                ...event,
                                name: event.name,
                                source: 'schedule' as const
                              });
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                            title="Editar evento"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeDefaultEvent(event);
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400"
                            title="Excluir evento"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    {defaultEvents.length === 0 && (
                      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                        Nenhum evento padrão cadastrado
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Grade do calendário */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col md:flex-row">
          {weekDays.map(day => (
            <div key={day.full} className="flex-1 min-w-[100px]">
              {/* Cabeçalho do dia */}
              <div className={`h-12 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center font-semibold sticky top-0 bg-white dark:bg-black z-10 transition-all duration-200 ${isToday(day.full) ? 'bg-purple-50 dark:bg-purple-900/10' : ''}`}>
                <div className="text-center w-full py-1">
                  <div className={`text-sm md:text-base font-bold tracking-wide ${isToday(day.full) ? 'text-purple-700 dark:text-purple-300' : 'text-purple-600 dark:text-purple-400'}`}>
                    {day.short.toUpperCase()}
                  </div>
                  <div className={`text-xs md:text-sm font-medium ${isToday(day.full) ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {day.display}
                  </div>
                  {isToday(day.full) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-purple-500 dark:bg-purple-400 rounded-full" />
                  )}
                </div>
              </div>

              {/* Células da grade */}
              <div className="relative">
                {gridSlots.map(index => (
                  <div
                    key={`${day.full}-${index}`}
                    className={`task-cell h-12 border-b border-r border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 ease-in-out ${draggingTask || draggingDefaultEvent ? 'cursor-copy' : ''}`}
                    onClick={(e) => handleCellClick(day.full, index, e)}
                    onMouseUp={() => {
                      handleDragEnd(day.full, index);
                      handleDefaultEventDragEnd(day.full, index);
                    }}
                  />
                ))}

                {/* Tarefas */}
                {tasks
                  .filter(task => task.days.includes(day.full))
                  .map(task => {
                    const { top, height } = getTaskPosition(task.gridPosition);
                    const isDragging = draggingTask?.task.id === task.id;

                    return (
                      <div
                        key={task.id}
                        onMouseDown={(e) => handleDragStart(task, e)}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!draggingTask) {
                            handleTaskClick(task, e);
                          }
                        }}
                        className={`absolute inset-x-0 mx-0.5 p-1 rounded cursor-grab active:cursor-grabbing text-xs overflow-hidden 
                          transition-all duration-300 ease-in-out group
                          ${getTaskColor(task.type, task.completed)}
                          group hover:z-10 hover:shadow-lg
                          ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-[1.02] hover:-translate-y-0.5'}
                        `}
                        style={{
                          top,
                          height,
                          userSelect: 'none'
                        }}
                      >
                        {/* Botões rápidos */}
                        <div className="absolute top-0.5 right-0.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleComplete(task.id);
                            }}
                            className="p-1 rounded bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                            title={task.completed ? "Desmarcar como concluído" : "Marcar como concluído"}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTask(task.id);
                            }}
                            className="p-1 rounded bg-gray-800/70 hover:bg-red-900/70 text-gray-300 hover:text-red-300 transition-all duration-200 hover:scale-110"
                            title="Excluir tarefa (Ctrl+Z para desfazer)"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1">
                            <span className="transform transition-transform duration-200 group-hover:scale-110">{task.type}</span>
                            <span className="font-medium truncate">{task.title}</span>
                          </div>
                          {task.startTime && (
                            <div className="text-[10px] md:text-[11px] font-medium text-gray-600 dark:text-gray-300">
                              {task.startTime} - {task.endTime}
                            </div>
                          )}
                          {task.notes && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                              <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded flex items-center justify-center p-2">
                                <div className="text-[10px] md:text-[11px] text-white text-center break-words">
                                  {task.notes}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Details Popup */}
      {showTaskDetails && (
        <div
          className="fixed bg-gray-900 shadow-2xl rounded-lg p-4 border border-gray-800 w-64"
          style={{
            left: showTaskDetails.position?.x,
            top: showTaskDetails.position?.y,
            transform: 'translate(-50%, -100%)',
            zIndex: 50
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">{showTaskDetails.task.title}</h3>
            <button
              onClick={() => setShowTaskDetails(null)}
              className="text-gray-400 hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-400">
              {showTaskDetails.task.startTime} - {showTaskDetails.task.endTime}
            </div>
            <textarea
              value={showTaskDetails.task.notes || ''}
              onChange={(e) => updateTask({ ...showTaskDetails.task, notes: e.target.value })}
              placeholder="Adicionar notas..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm"
              rows={3}
            />
            <div className="flex justify-between pt-2">
              <button
                onClick={() => {
                  deleteTask(showTaskDetails.task.id);
                  setShowTaskDetails(null);
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Excluir
              </button>
              <button
                onClick={() => {
                  setNewTask({
                    ...showTaskDetails.task,
                    days: [weekDays[0].full],
                    type: showTaskDetails.task.type || '📝',
                    notes: showTaskDetails.task.notes || ''
                  });
                  setShowNewTaskForm(true);
                  setShowTaskDetails(null);
                }}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de nova tarefa */}
      {showNewTaskForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in" onClick={() => {
          setShowNewTaskForm(false);
          setShowEmojiPicker(false);
          setShowSuggestions(false);
        }}>
          <div
            className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md transform transition-all duration-200 ease-in-out animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Ícone</label>
                  <button
                    onClick={handleEmojiButtonClick}
                    className="w-10 h-10 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-xl"
                  >
                    {newTask.type}
                  </button>
                  {showEmojiPicker && (
                    <EmojiPicker
                      onSelect={(emoji) => {
                        setNewTask({ ...newTask, type: emoji });
                        setShowEmojiPicker(false);
                      }}
                      onClose={() => setShowEmojiPicker(false)}
                    />
                  )}
                </div>
                <div className="flex-1 relative">
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => {
                      setNewTask({ ...newTask, title: e.target.value });
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    placeholder="Digite o título da tarefa"
                  />
                  {showSuggestions && getFilteredSuggestions(newTask.title).length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                      {getFilteredSuggestions(newTask.title).map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => {
                            setNewTask({ ...newTask, title: suggestion });
                            setShowSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Início</label>
                  <input
                    type="time"
                    value={newTask.startTime}
                    onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Fim</label>
                  <input
                    type="time"
                    value={newTask.endTime}
                    onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dias</label>
                <div className="flex flex-wrap gap-2">
                  {weekDayOptions.map(day => (
                    <button
                      key={day.value}
                      onClick={() => {
                        const date = getDayInCurrentWeek(day.value);
                        setNewTask(prev => ({
                          ...prev,
                          days: prev.days.includes(date)
                            ? prev.days.filter(d => d !== date)
                            : [...prev.days, date]
                        }));
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${newTask.days.includes(getDayInCurrentWeek(day.value))
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notas</label>
                <textarea
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  rows={3}
                  placeholder="Adicionar notas (opcional)"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowNewTaskForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateTask}
                disabled={!newTask.title || newTask.days.length === 0}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de novo evento padrão */}
      {showDefaultEventForm && (
        <DefaultEventDialog
          event={newDefaultEvent.id ? defaultEvents.find(e => e.id === newDefaultEvent.id) : undefined}
          onClose={() => {
            setShowDefaultEventForm(false);
            setNewDefaultEvent(initialDefaultEvent);
          }}
          onSave={(eventData) => {
            if (eventData.id) {
              // Atualizar evento existente
              const updatedEvent: DefaultEvent = {
                ...eventData,
                id: eventData.id,
                source: 'schedule' as const
              };
              updateDefaultEvent(updatedEvent);
            } else {
              // Criar novo evento
              const newEvent: DefaultEvent = {
                ...eventData,
                id: crypto.randomUUID(),
                source: 'schedule' as const
              };
              addDefaultEvent(newEvent);
              handleAddDefaultEvent(newEvent);
            }
            setShowDefaultEventForm(false);
            setNewDefaultEvent(initialDefaultEvent);
          }}
          onDelete={(event) => {
            removeDefaultEvent(event);
            setShowDefaultEventForm(false);
            setNewDefaultEvent(initialDefaultEvent);
          }}
        />
      )}

      {selectedTask && (
        <TaskEditDialog
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSaveTask}
          onDelete={deleteTask}
        />
      )}

      {/* Tarefa sendo arrastada */}
      {draggingTask && mousePosition && (
        <div
          className={`fixed z-50 pointer-events-none p-1 rounded text-xs w-[100px] overflow-hidden
            ${getTaskColor(draggingTask.task.type, draggingTask.task.completed)}
            shadow-xl scale-105
          `}
          style={{
            left: mousePosition.x - (draggingTask.mouseOffset?.x ?? 0),
            top: mousePosition.y - (draggingTask.mouseOffset?.y ?? 0),
            height: '48px'
          }}
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <span>{draggingTask.task.type}</span>
              <span className="font-medium truncate">{draggingTask.task.title}</span>
            </div>
            {draggingTask.task.startTime && (
              <div className="text-[11px] font-medium text-gray-600 dark:text-gray-300">
                {draggingTask.task.startTime} - {draggingTask.task.endTime}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Default Event being dragged */}
      {draggingDefaultEvent && mousePosition && (
        <div
          className="fixed z-50 pointer-events-none p-2 rounded text-xs bg-gray-100 dark:bg-gray-800/70 border-l-4 border-purple-500 shadow-xl w-[150px]"
          style={{
            left: mousePosition.x - (draggingDefaultEvent.mouseOffset?.x ?? 0),
            top: mousePosition.y - (draggingDefaultEvent.mouseOffset?.y ?? 0),
            height: 'auto'
          }}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-lg">{draggingDefaultEvent.type}</span>
              <span className="font-medium truncate">{draggingDefaultEvent.title}</span>
            </div>
            <div className="text-[11px] font-medium text-gray-600 dark:text-gray-300">
              {draggingDefaultEvent.startTime} - {draggingDefaultEvent.endTime}
            </div>
          </div>
        </div>
      )}

      {/* Notification when task is deleted */}
      {deletedTasks.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <span>Tarefa excluída</span>
          <button
            onClick={handleUndoDelete}
            className="text-purple-300 hover:text-purple-200 font-medium"
          >
            Desfazer (Ctrl+Z)
          </button>
        </div>
      )}
    </div>
  );
};

export default Schedule; 