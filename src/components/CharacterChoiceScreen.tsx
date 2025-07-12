import React, { useState } from 'react';
import { User, Gavel, Users, ArrowRight } from 'lucide-react';
import CharacterCard from './CharacterCard';

interface CharacterChoiceScreenProps {
  onNext: () => void;
}

const characters = [
  {
    id: 'moderator',
    name: 'Moderator',
    role: 'Keeps Order',
    description: 'Ensures fair play, manages time limits, and maintains respectful discussion throughout the debate.',
    icon: Gavel,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'speaker1',
    name: 'Affirmative Speaker',
    role: 'Argues FOR',
    description: 'Presents arguments supporting the resolution and defends the positive position with evidence.',
    icon: User,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'speaker2',
    name: 'Negative Speaker',
    role: 'Argues AGAINST',
    description: 'Challenges the resolution with counter-arguments and questions the opposing position.',
    icon: Users,
    color: 'from-purple-500 to-purple-600'
  }
];

const CharacterChoiceScreen: React.FC<CharacterChoiceScreenProps> = ({ onNext }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [allViewed, setAllViewed] = useState<Set<string>>(new Set());

  const handleCharacterSelect = (id: string) => {
    setSelectedCharacter(id);
    setAllViewed(prev => new Set([...prev, id]));
  };

  const canProceed = allViewed.size === characters.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cream-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Meet the Debate Team</h1>
          <p className="text-lg text-gray-600">Tap each character to learn their role</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={handleCharacterSelect}
              isSelected={selectedCharacter === character.id}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {characters.map((_, index) => (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${allViewed.has(characters[index].id) ? 'bg-blue-400' : 'bg-gray-200'}
                `}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
              ${canProceed 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-lg text-gray-600">Tap each character card to learn their role</p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs">👆</span>
            </div>
            <span className="font-medium">Cards flip to reveal details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterChoiceScreen;