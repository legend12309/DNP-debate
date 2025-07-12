import React, { useState } from 'react';
import { ArrowRight, Heart, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { EmotionEvidenceStatement } from '../types/GrandPersuasion';

interface EmotionOrEvidenceChallengeProps {
  data: EmotionEvidenceStatement[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

const EmotionOrEvidenceChallenge: React.FC<EmotionOrEvidenceChallengeProps> = ({ data, onComplete, onBack }) => {
  const [currentStatement, setCurrentStatement] = useState(0);
  const [selectedType, setSelectedType] = useState<'emotional' | 'factual' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const statement = data[currentStatement];
  const isCorrect = selectedType === statement.type;

  const handleTypeSelect = (type: 'emotional' | 'factual') => {
    setSelectedType(type);
    setShowFeedback(true);
    if (type === statement.type) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStatement < data.length - 1) {
      setCurrentStatement(prev => prev + 1);
      setSelectedType(null);
      setShowFeedback(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-100 mb-4">Emotion or Evidence?</h1>
          <p className="text-green-200 text-lg">Classify each statement as emotional or factual</p>
        </div>

        {/* Chalkboard */}
        <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
          <div className="text-green-300 text-sm mb-6">
            Statement {currentStatement + 1}/{data.length}
          </div>
          
          <div className="mb-8">
            <div className="text-green-100 text-xl leading-relaxed p-6 bg-green-700/50 rounded-lg border border-green-600">
              "{statement.text}"
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-green-100 text-xl font-bold">How would you classify this statement?</h3>
          </div>
        </div>

        {/* Classification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <button
            onClick={() => handleTypeSelect('emotional')}
            disabled={showFeedback}
            className={`
              p-8 rounded-3xl border-2 transition-all duration-300 text-center
              ${selectedType === 'emotional'
                ? showFeedback
                  ? isCorrect && statement.type === 'emotional'
                    ? 'border-pink-400 bg-pink-100 shadow-xl scale-105'
                    : statement.type === 'emotional'
                      ? 'border-pink-400 bg-pink-100 shadow-xl scale-105'
                      : 'border-red-400 bg-red-100 shadow-xl'
                  : 'border-pink-400 bg-pink-100 shadow-xl scale-105'
                : 'border-green-600 bg-green-700 hover:bg-green-600 hover:scale-102'
              }
              ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
            <h3 className={`text-2xl font-bold mb-4 ${
              selectedType === 'emotional' && showFeedback
                ? isCorrect && statement.type === 'emotional'
                  ? 'text-pink-800'
                  : statement.type === 'emotional'
                    ? 'text-pink-800'
                    : 'text-red-800'
                : selectedType === 'emotional'
                  ? 'text-pink-800'
                  : 'text-green-100'
            }`}>
              Emotional
            </h3>
            <p className={`text-sm ${
              selectedType === 'emotional' && showFeedback
                ? 'text-pink-700'
                : selectedType === 'emotional'
                  ? 'text-pink-700'
                  : 'text-green-200'
            }`}>
              Appeals to feelings, values, and personal experiences
            </p>
            {showFeedback && statement.type === 'emotional' && (
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mt-4" />
            )}
            {showFeedback && selectedType === 'emotional' && statement.type !== 'emotional' && (
              <XCircle className="w-8 h-8 text-red-600 mx-auto mt-4" />
            )}
          </button>

          <button
            onClick={() => handleTypeSelect('factual')}
            disabled={showFeedback}
            className={`
              p-8 rounded-3xl border-2 transition-all duration-300 text-center
              ${selectedType === 'factual'
                ? showFeedback
                  ? isCorrect && statement.type === 'factual'
                    ? 'border-blue-400 bg-blue-100 shadow-xl scale-105'
                    : statement.type === 'factual'
                      ? 'border-blue-400 bg-blue-100 shadow-xl scale-105'
                      : 'border-red-400 bg-red-100 shadow-xl'
                  : 'border-blue-400 bg-blue-100 shadow-xl scale-105'
                : 'border-green-600 bg-green-700 hover:bg-green-600 hover:scale-102'
              }
              ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className={`text-2xl font-bold mb-4 ${
              selectedType === 'factual' && showFeedback
                ? isCorrect && statement.type === 'factual'
                  ? 'text-blue-800'
                  : statement.type === 'factual'
                    ? 'text-blue-800'
                    : 'text-red-800'
                : selectedType === 'factual'
                  ? 'text-blue-800'
                  : 'text-green-100'
            }`}>
              Factual
            </h3>
            <p className={`text-sm ${
              selectedType === 'factual' && showFeedback
                ? 'text-blue-700'
                : selectedType === 'factual'
                  ? 'text-blue-700'
                  : 'text-green-200'
            }`}>
              Uses data, statistics, and verifiable information
            </p>
            {showFeedback && statement.type === 'factual' && (
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mt-4" />
            )}
            {showFeedback && selectedType === 'factual' && statement.type !== 'factual' && (
              <XCircle className="w-8 h-8 text-red-600 mx-auto mt-4" />
            )}
          </button>
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
                  {isCorrect ? 'Correct!' : `Actually, this is ${statement.type}`}
                </h3>
                <p className={`${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
                  {statement.explanation}
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
            Score: {score}/{currentStatement + (showFeedback ? 1 : 0)}
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
            {currentStatement < data.length - 1 ? 'Next Statement' : 'Complete Challenge'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionOrEvidenceChallenge;