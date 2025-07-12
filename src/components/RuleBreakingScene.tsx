import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface RuleBreakingSceneProps {
  onNext: () => void;
}

const mistakes = [
  { id: 'interruption', x: 25, y: 40, description: 'Speaker interrupting opponent' },
  { id: 'time', x: 70, y: 30, description: 'Going over time limit' },
  { id: 'attack', x: 45, y: 60, description: 'Making personal attacks' },
  { id: 'evidence', x: 60, y: 70, description: 'Using unreliable sources' }
];

const RuleBreakingScene: React.FC<RuleBreakingSceneProps> = ({ onNext }) => {
  const [foundMistakes, setFoundMistakes] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const handleMistakeClick = (mistakeId: string) => {
    if (!foundMistakes.has(mistakeId)) {
      setFoundMistakes(prev => new Set([...prev, mistakeId]));
      setShowFeedback(mistakeId);
      setTimeout(() => setShowFeedback(null), 2000);
    }
  };

  const allFound = foundMistakes.size === mistakes.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-blue-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Spot the Rule Violations</h1>
          <p className="text-lg text-gray-600">Tap the mistakes you see in this debate scene</p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden mb-8" style={{ aspectRatio: '16/10' }}>
          {/* Classroom illustration background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50">
            {/* Podium */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg"></div>
            
            {/* Speakers */}
            <div className="absolute bottom-16 left-1/4 w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
            <div className="absolute bottom-16 right-1/4 w-16 h-20 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full"></div>
            
            {/* Judge */}
            <div className="absolute top-1/4 right-1/4 w-12 h-16 bg-gradient-to-b from-green-400 to-green-500 rounded-full"></div>
            
            {/* Timer */}
            <div className="absolute top-1/4 left-1/4 w-20 h-12 bg-red-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">5:30</span>
            </div>
          </div>

          {/* Mistake hotspots */}
          {mistakes.map((mistake) => (
            <button
              key={mistake.id}
              onClick={() => handleMistakeClick(mistake.id)}
              className={`
                absolute w-12 h-12 rounded-full transition-all duration-300 transform
                ${foundMistakes.has(mistake.id)
                  ? 'bg-red-500 border-4 border-red-300 animate-pulse scale-110'
                  : 'bg-red-400/70 hover:bg-red-500 hover:scale-110 animate-bounce'
                }
              `}
              style={{ left: `${mistake.x}%`, top: `${mistake.y}%` }}
            >
              {foundMistakes.has(mistake.id) ? (
                <XCircle className="w-6 h-6 text-white mx-auto" />
              ) : (
                <div className="w-3 h-3 bg-white rounded-full mx-auto" />
              )}
            </button>
          ))}

          {/* Feedback popup */}
          {showFeedback && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg p-4 border-2 border-red-200 animate-fade-in">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-gray-800">
                  {mistakes.find(m => m.id === showFeedback)?.description}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-700">
              Found: {foundMistakes.size}/{mistakes.length}
            </span>
            <div className="flex space-x-2">
              {mistakes.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${foundMistakes.has(mistakes[index].id) ? 'bg-red-400' : 'bg-gray-200'}
                  `}
                />
              ))}
            </div>
          </div>

          <button
            onClick={onNext}
            disabled={!allFound}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
              ${allFound 
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {allFound ? (
              <>
                Great Job! <CheckCircle className="w-5 h-5" />
              </>
            ) : (
              <>
                Find All Mistakes <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RuleBreakingScene;