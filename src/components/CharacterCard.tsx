import React, { useState } from 'react';
import { User, Gavel, Users } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface CharacterCardProps {
  character: Character;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect, isSelected }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComponent = character.icon;

  const handleTap = () => {
    setIsFlipped(!isFlipped);
    onSelect(character.id);
  };

  return (
    <div className="perspective-1000 w-full h-64">
      <div 
        className={`
          relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
        onClick={handleTap}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className={`
            w-full h-full rounded-3xl shadow-lg border-2 transition-all duration-300
            ${isSelected ? 'border-blue-400 shadow-xl scale-105' : 'border-gray-200 hover:shadow-xl hover:scale-102'}
            bg-gradient-to-br from-white to-gray-50
          `}>
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center mb-4
                bg-gradient-to-br ${character.color}
              `}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{character.name}</h3>
              <p className="text-sm text-gray-600 text-center">{character.role}</p>
              <div className="mt-4 flex items-center justify-center gap-1">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs">?</span>
                </div>
                <span className="text-xs text-blue-500 font-medium">Tap to flip & learn more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full rounded-3xl shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-4
                bg-gradient-to-br ${character.color}
              `}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{character.name}</h3>
              <p className="text-sm text-gray-700 text-center leading-relaxed">{character.description}</p>
              <div className="mt-4 flex items-center justify-center gap-1">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-xs text-green-600 font-medium">Tap to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;