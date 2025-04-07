import React, { useState } from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

interface EmojiCategory {
  name: string;
  emojis: string[];
}

const emojiCategories: EmojiCategory[] = [
  {
    name: "Trabalho",
    emojis: ["💼", "💻", "📊", "📈", "📝", "✏️", "📌", "📍", "🗂️", "📁", "📂", "🗄️", "📅", "⏰", "⌚"]
  },
  {
    name: "Estudo",
    emojis: ["📚", "📖", "✏️", "📝", "🎓", "🎒", "📓", "📔", "📒", "📕", "📗", "📘", "📙", "🔍", "📐"]
  },
  {
    name: "Saúde",
    emojis: ["🏃", "🏋️", "🧘", "🚴", "🎾", "⚽", "🏊", "💪", "🥗", "🥑", "🍎", "💊", "🏥", "🧠", "❤️"]
  },
  {
    name: "Social",
    emojis: ["👥", "🤝", "🗣️", "💬", "🎉", "🎊", "🎭", "🎪", "🎫", "🎟️", "🍽️", "🍻", "🥂", "🎮", "🎲"]
  },
  {
    name: "Lazer",
    emojis: ["🎮", "🎬", "🎵", "🎨", "📺", "🎭", "🎪", "🎢", "🎡", "🎯", "🎱", "🎲", "🎳", "🎰", "🎪"]
  },
  {
    name: "Rotina",
    emojis: ["🛁", "🚿", "🧹", "🧺", "🛒", "🍳", "🛋️", "🚗", "🚌", "🏠", "📱", "💡", "🔧", "🔨", "🧰", "☕"]
  }
];

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
  const [currentCategory, setCurrentCategory] = useState(0);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="fixed bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
        onClick={e => e.stopPropagation()}
        style={{
          width: '280px',
          maxHeight: '380px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 #1F2937'
        }}
      >
        <div className="sticky top-0 bg-gray-800 p-3 border-b border-gray-700 flex items-center justify-between">
          <button
            onClick={() => setCurrentCategory(prev => (prev > 0 ? prev - 1 : emojiCategories.length - 1))}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-lg text-lg"
          >
            ◀
          </button>
          <span className="text-base font-medium px-2">{emojiCategories[currentCategory].name}</span>
          <button
            onClick={() => setCurrentCategory(prev => (prev < emojiCategories.length - 1 ? prev + 1 : 0))}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-lg text-lg"
          >
            ▶
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-3">
            {emojiCategories[currentCategory].emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => onSelect(emoji)}
                className="w-8 h-8 flex items-center justify-center text-2xl hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 