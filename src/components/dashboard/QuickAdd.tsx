import React, { useState } from 'react';

const QuickAdd: React.FC = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar processamento de linguagem natural
    console.log('Processando:', input);
    setInput('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Adicionar Rápido
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Reunião com João amanhã às 14h"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-400 hover:text-purple-500 dark:text-gray-500 dark:hover:text-purple-400 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Dica: Use linguagem natural para adicionar tarefas rapidamente
        </div>
      </form>

      {/* Sugestões */}
      <div className="mt-4 flex flex-wrap gap-2">
        <SuggestionButton text="Hoje" />
        <SuggestionButton text="Amanhã" />
        <SuggestionButton text="Próxima semana" />
        <SuggestionButton text="Reunião" />
        <SuggestionButton text="Lembrete" />
      </div>
    </div>
  );
};

const SuggestionButton: React.FC<{ text: string }> = ({ text }) => (
  <button
    type="button"
    className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
  >
    {text}
  </button>
);

export default QuickAdd; 