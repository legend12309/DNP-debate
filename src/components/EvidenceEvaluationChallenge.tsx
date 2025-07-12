import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, Scale } from 'lucide-react';
import { EvidenceEvaluationData } from '../types/FallacyGame';

interface EvidenceEvaluationChallengeProps {
  data: EvidenceEvaluationData[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

const EvidenceEvaluationChallenge: React.FC<EvidenceEvaluationChallengeProps> = ({ data, onComplete, onBack }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [selectedRating, setSelectedRating] = useState<'strong' | 'weak' | 'unsupported' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const item = data[currentItem];
  const isCorrect = selectedRating === item.correctRating;

  const handleRatingSelect = (rating: 'strong' | 'weak' | 'unsupported') => {
    setSelectedRating(rating);
    setShowFeedback(true);
    if (rating === item.correctRating) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentItem < data.length - 1) {
      setCurrentItem(prev => prev + 1);
      setSelectedRating(null);
      setShowFeedback(false);
    } else {
      onComplete(score);
    }
  };

  const getRatingColor = (rating: 'strong' | 'weak' | 'unsupported') => {
    switch (rating) {
      case 'strong': return 'from-green-400 to-green-500';
      case 'weak': return 'from-yellow-400 to-yellow-500';
      case 'unsupported': return 'from-red-400 to-red-500';
    }
  };

  const getRatingIcon = (rating: 'strong' | 'weak' | 'unsupported') => {
    switch (rating) {
      case 'strong': return '💪';
      case 'weak': return '⚠️';
      case 'unsupported': return '❌';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-100 mb-4">Evidence Evaluation</h1>
          <p className="text-green-200 text-lg">Rate the strength of the evidence</p>
        </div>

        {/* Chalkboard */}
        <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
          <div className="text-green-300 text-sm mb-4">
            Case {currentItem + 1}/{data.length}
          </div>
          
          <div className="mb-8">
            <h3 className="text-green-100 text-xl font-bold mb-4">Argument:</h3>
            <p className="text-green-200 text-lg mb-6 italic">"{item.argument}"</p>
            
            <h3 className="text-green-100 text-xl font-bold mb-4">Evidence:</h3>
            <p className="text-green-200 text-lg">{item.evidence}</p>
          </div>

          <div className="text-center">
            <Scale className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-green-100 text-xl font-bold mb-6">How strong is this evidence?</h3>
          </div>
        </div>

        {/* Rating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {(['strong', 'weak', 'unsupported'] as const).map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingSelect(rating)}
              disabled={showFeedback}
              className={`
                p-6 rounded-2xl border-2 transition-all duration-300 text-center
                ${selectedRating === rating
                  ? showFeedback
                    ? isCorrect && rating === item.correctRating
                      ? 'border-green-400 bg-green-100 shadow-xl scale-105'
                      : rating === item.correctRating
                        ? 'border-green-400 bg-green-100 shadow-xl scale-105'
                        : 'border-red-400 bg-red-100 shadow-xl'
                    : 'border-yellow-400 bg-yellow-100 shadow-xl scale-105'
                  : 'border-green-600 bg-green-700 hover:bg-green-600 hover:scale-102'
                }
                ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <div className="text-4xl mb-3">{getRatingIcon(rating)}</div>
              <div className={`
                text-xl font-bold mb-2 capitalize
                ${selectedRating === rating && showFeedback
                  ? isCorrect && rating === item.correctRating
                    ? 'text-green-800'
                    : rating === item.correctRating
                      ? 'text-green-800'
                      : 'text-red-800'
                  : selectedRating === rating
                    ? 'text-yellow-800'
                    : 'text-green-100'
                }
              `}>
                {rating}
              </div>
              {showFeedback && rating === item.correctRating && (
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
              )}
              {showFeedback && selectedRating === rating && rating !== item.correctRating && (
                <XCircle className="w-6 h-6 text-red-600 mx-auto" />
              )}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{isCorrect ? '✅' : '❌'}</div>
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">
                  {isCorrect ? 'Correct!' : `Incorrect - The answer is "${item.correctRating}"`}
                </h3>
                <p className="text-yellow-700">{item.explanation}</p>
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
            Score: {score}/{currentItem + (showFeedback ? 1 : 0)}
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
            {currentItem < data.length - 1 ? 'Next Case' : 'Complete Challenge'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceEvaluationChallenge