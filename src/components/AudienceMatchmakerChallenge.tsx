import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { AudienceGroup, ToneOption } from '../types/GrandPersuasion';

interface AudienceMatchmakerChallengeProps {
  audiences: AudienceGroup[];
  toneOptions: ToneOption[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

const AudienceMatchmakerChallenge: React.FC<AudienceMatchmakerChallengeProps> = ({ 
  audiences, 
  toneOptions, 
  onComplete, 
  onBack 
}) => {
  const [currentAudience, setCurrentAudience] = useState(0);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const audience = audiences[currentAudience];
  const currentOptions = toneOptions.filter((_, index) => 
    Math.floor(index / 3) === currentAudience
  );
  
  const correctOption = currentOptions.find(option => option.audienceMatch === audience.id);
  const isCorrect = selectedTone === correctOption?.id;

  const handleToneSelect = (toneId: string) => {
    setSelectedTone(toneId);
    setShowFeedback(true);
    if (toneId === correctOption?.id) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentAudience < audiences.length - 1) {
      setCurrentAudience(prev => prev + 1);
      setSelectedTone(null);
      setShowFeedback(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-100 mb-4">Audience Matchmaker</h1>
          <p className="text-green-200 text-lg">Choose the right tone for each audience</p>
        </div>

        {/* Current Audience */}
        <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
          <div className="text-green-300 text-sm mb-6">
            Audience {currentAudience + 1}/{audiences.length}
          </div>
          
          <div className={`
            p-6 rounded-2xl border-2 border-green-600 bg-gradient-to-r ${audience.color} mb-6
          `}>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{audience.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">{audience.name}</h3>
                <p className="text-white/90">{audience.description}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-green-100 text-xl font-bold mb-4">
              Which tone would work best for this audience?
            </h3>
          </div>
        </div>

        {/* Tone Options */}
        <div className="space-y-4 mb-8">
          {currentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleToneSelect(option.id)}
              disabled={showFeedback}
              className={`
                w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left
                ${selectedTone === option.id
                  ? showFeedback
                    ? isCorrect && option.id === correctOption?.id
                      ? 'border-green-400 bg-green-100 shadow-xl scale-102'
                      : option.id === correctOption?.id
                        ? 'border-green-400 bg-green-100 shadow-xl scale-102'
                        : 'border-red-400 bg-red-100 shadow-xl'
                    : 'border-yellow-400 bg-yellow-100 shadow-xl scale-102'
                  : 'border-green-600 bg-green-700 hover:bg-green-600 hover:scale-101'
                }
                ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className={`
                    text-lg font-medium mb-2 capitalize
                    ${selectedTone === option.id && showFeedback
                      ? isCorrect && option.id === correctOption?.id
                        ? 'text-green-800'
                        : option.id === correctOption?.id
                          ? 'text-green-800'
                          : 'text-red-800'
                      : selectedTone === option.id
                        ? 'text-yellow-800'
                        : 'text-green-100'
                    }
                  `}>
                    {option.tone} Tone
                  </div>
                  <p className={`
                    text-sm leading-relaxed
                    ${selectedTone === option.id && showFeedback
                      ? isCorrect && option.id === correctOption?.id
                        ? 'text-green-700'
                        : option.id === correctOption?.id
                          ? 'text-green-700'
                          : 'text-red-700'
                      : selectedTone === option.id
                        ? 'text-yellow-700'
                        : 'text-green-200'
                    }
                  `}>
                    "{option.text}"
                  </p>
                </div>
                
                <div className="ml-4">
                  {showFeedback && option.id === correctOption?.id && (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  )}
                  {showFeedback && selectedTone === option.id && option.id !== correctOption?.id && (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`
            border-2 rounded-lg p-6 mb-8 animate-fade-in
            ${isCorrect 
              ? 'bg-green-100 border-green-300' 
              : 'bg-yellow-100 border-yellow-300'
            }
          `}>
            <div className="flex items-start gap-3">
              <div className="text-2xl">{isCorrect ? '✅' : '💡'}</div>
              <div>
                <h3 className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                  {isCorrect ? 'Perfect Match!' : `Better choice: ${correctOption?.tone} tone`}
                </h3>
                <p className={`${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
                  {isCorrect 
                    ? `The ${correctOption?.tone} tone resonates well with ${audience.name.toLowerCase()}.`
                    : `${audience.name} respond better to ${correctOption?.tone} communication that matches their expectations.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="bg-green-700 hover:bg-green-600 text-green-100 px-6 py-3 rounded-full transition-all duration-300"
          >
            Back
          </button>

          <div className="text-green-300">
            Score: {score}/{currentAudience + (showFeedback ? 1 : 0)}
          </div>

          <button
            onClick={handleNext}
            disabled={!showFeedback}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
              ${showFeedback
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-green-600 text-green-300 cursor-not-allowed'
              }
            `}
          >
            {currentAudience < audiences.length - 1 ? 'Next Audience' : 'Complete Challenge'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudienceMatchmakerChallenge;