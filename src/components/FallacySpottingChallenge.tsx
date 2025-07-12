import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { FallacySpottingData } from '../types/FallacyGame';

interface FallacySpottingChallengeProps {
  data: FallacySpottingData[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

const FallacySpottingChallenge: React.FC<FallacySpottingChallengeProps> = ({ data, onComplete, onBack }) => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [foundFallacies, setFoundFallacies] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const dialogue = data[currentDialogue];
  const totalFallacies = dialogue.fallacies.length;
  const foundCount = foundFallacies.size;

  const handleTextClick = (clickPosition: number) => {
    const fallacy = dialogue.fallacies.find(f => 
      clickPosition >= f.position.start && clickPosition <= f.position.end
    );

    if (fallacy && !foundFallacies.has(fallacy.id)) {
      setFoundFallacies(prev => new Set([...prev, fallacy.id]));
      setShowFeedback(fallacy.id);
      setScore(prev => prev + 1);
      setTimeout(() => setShowFeedback(null), 3000);
    }
  };

  const handleFallacyClick = (fallacyId: string) => {
    if (!foundFallacies.has(fallacyId)) {
      setFoundFallacies(prev => new Set([...prev, fallacyId]));
      setShowFeedback(fallacyId);
      setScore(prev => prev + 1);
      setTimeout(() => setShowFeedback(null), 3000);
    }
  };

  const handleNext = () => {
    if (currentDialogue < data.length - 1) {
      setCurrentDialogue(prev => prev + 1);
      setFoundFallacies(new Set());
      setShowFeedback(null);
    } else {
      onComplete(score);
    }
  };

  const renderHighlightedText = () => {
    const text = dialogue.dialogue;
    const parts = [];
    let lastIndex = 0;

    // Sort fallacies by position to avoid overlap issues
    const sortedFallacies = [...dialogue.fallacies].sort((a, b) => a.position.start - b.position.start);

    sortedFallacies.forEach((fallacy, index) => {
      // Add text before fallacy
      if (fallacy.position.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {text.substring(lastIndex, fallacy.position.start)}
          </span>
        );
      }

      // Add fallacy text (clickable)
      const fallacyText = text.substring(fallacy.position.start, fallacy.position.end);
      const isFound = foundFallacies.has(fallacy.id);
      
      parts.push(
        <span
          key={fallacy.id}
          onClick={(e) => {
            e.stopPropagation();
            handleFallacyClick(fallacy.id);
          }}
          className={`
            cursor-pointer transition-all duration-300 px-1 py-0.5 rounded
            ${isFound 
              ? 'bg-red-200 text-red-800 animate-pulse' 
              : 'hover:bg-yellow-200 hover:text-yellow-800 underline decoration-dotted decoration-yellow-400'
            }
          `}
          title={isFound ? `Found: ${fallacy.type}` : 'Click if you think this is a fallacy'}
        >
          {fallacyText}
        </span>
      );

      lastIndex = fallacy.position.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key="text-end">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  const currentFallacy = showFeedback ? dialogue.fallacies.find(f => f.id === showFeedback) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-100 mb-4">Fallacy Spotting</h1>
          <p className="text-green-200 text-lg">Tap on logical fallacies in the dialogue</p>
        </div>

        {/* Chalkboard */}
        <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8 relative">
          <div className="absolute top-4 right-4 text-green-300 text-sm">
            Dialogue {currentDialogue + 1}/{data.length}
          </div>
          
          <div className="mb-6">
            <div className="text-green-200 text-sm mb-2">{dialogue.speaker} says:</div>
            <div className="text-green-100 text-xl leading-relaxed select-none">
              {renderHighlightedText()}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-green-300">
              Found: {foundCount}/{totalFallacies} fallacies
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: totalFallacies }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < foundCount ? 'bg-yellow-400' : 'bg-green-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {currentFallacy && (
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">{currentFallacy.type} Fallacy</h3>
                <p className="text-yellow-700">{currentFallacy.explanation}</p>
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

          <button
            onClick={handleNext}
            disabled={foundCount < totalFallacies}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
              ${foundCount >= totalFallacies
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-green-600 text-green-300 cursor-not-allowed'
              }
            `}
          >
            {currentDialogue < data.length - 1 ? 'Next Dialogue' : 'Complete Challenge'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FallacySpottingChallenge