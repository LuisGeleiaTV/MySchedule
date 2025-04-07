import React, { createContext, useContext, useState } from 'react';
import { Task } from './TaskContext';

export interface DefaultEvent extends Omit<Task, 'id' | 'days'> {
  id: string;
  name: string;
  weekDays: number[];
}

interface DefaultEventsContextType {
  defaultEvents: DefaultEvent[];
  addDefaultEvent: (event: DefaultEvent) => void;
  removeDefaultEvent: (event: DefaultEvent) => void;
  updateDefaultEvent: (event: DefaultEvent) => void;
}

const DefaultEventsContext = createContext<DefaultEventsContextType | undefined>(undefined);

export const useDefaultEvents = () => {
  const context = useContext(DefaultEventsContext);
  if (!context) {
    throw new Error('useDefaultEvents must be used within a DefaultEventsProvider');
  }
  return context;
};

export const DefaultEventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [defaultEvents, setDefaultEvents] = useState<DefaultEvent[]>([]);

  const addDefaultEvent = (event: DefaultEvent) => {
    setDefaultEvents(prev => [...prev, event]);
  };

  const removeDefaultEvent = (event: DefaultEvent) => {
    setDefaultEvents(prev => prev.filter(e => e.id !== event.id));
  };

  const updateDefaultEvent = (event: DefaultEvent) => {
    setDefaultEvents(prev => prev.map(e => e.id === event.id ? event : e));
  };

  return (
    <DefaultEventsContext.Provider value={{ defaultEvents, addDefaultEvent, removeDefaultEvent, updateDefaultEvent }}>
      {children}
    </DefaultEventsContext.Provider>
  );
}; 