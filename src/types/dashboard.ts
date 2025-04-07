export interface Task {
  id: string;
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  date?: string;
  category: 'work' | 'personal' | 'health' | 'study' | 'other';
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  project?: string;
  timeSpent?: number; // em minutos
  isAllDay?: boolean;
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  progress: number;
  tasks: string[]; // IDs das tasks
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface TimeBlock {
  id: string;
  taskId: string;
  startTime: string;
  endTime: string;
  date: string;
  color?: string;
}

export interface Habit {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[];
  streak: number;
  color?: string;
}

export interface DashboardStats {
  todayTasks: number;
  completedTasks: number;
  overdueTasks: number;
  weeklyProgress: number;
  totalFocusTime: number; // em minutos
  habitStreak: number;
} 