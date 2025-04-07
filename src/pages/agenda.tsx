import React from 'react';
import dynamic from 'next/dynamic';

const Schedule = dynamic(() => import('../components/Schedule'), {
  ssr: false,
  loading: () => <div>Carregando...</div>
});

const AgendaPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Agenda Semanal</h2>
      <Schedule />
    </div>
  );
};

export default AgendaPage; 