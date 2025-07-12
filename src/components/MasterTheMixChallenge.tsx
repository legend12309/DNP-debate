import React, { useState } from 'react';
import { ArrowRight, Heart, Brain, Sparkles, RotateCcw } from 'lucide-react';
import { MixPhrase } from '../types/GrandPersuasion';

interface MasterTheMixChallengeProps {
  phrases: MixPhrase[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

const MasterTheMixChallenge: React.FC<MasterTheMixChallengeProps> = ({ phrases, onComplete, onBack }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<MixPhrase | null>(null);
  const [selectedLogic, setSelectedLogic] = useState<MixPhrase | null>(null);
  const [createdPhrases, setCreatedPhrases] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  const emotionPhrases = phrases.filter(p => p.type === 'emotion');
  const logicPhrases = phrases.filter(p => p.type === 'logic');

  const handleEmotionSelect = (phrase: MixPhrase) => {
    setSelectedEmotion(phrase);
    setShowResult(false);
  };

  const handleLogicSelect = (phrase: MixPhrase) => {
    setSelectedLogic(phrase);
    setShowResult(false);
  };

  const handleCombine = () => {
    if (selectedEmotion && selectedLogic) {
      const combinedPhrase = `${selectedEmotion.text} ${selectedLogic.text}.`;
      setCreatedPhrases(prev => [...prev, combinedPhrase]);
      setShowResult(true);
      setCurrentScore(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setSelectedEmotion(null);
    setSelectedLogic(null);
    setShowResult(false);
  };

  const handleComplete = () => {
    onComplete(currentScore);
  };

  const canCombine = selectedEmotion && selectedLogic;
  const hasCreatedEnough = createdPhrases.length >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-100 mb-4">Master the Mix</h1>
          <p className="text-green-200 text-lg">Combine emotion and logic to create persuasive phrases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Emotion Phrases */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-pink-400" />
              <h3 className="text-2xl font-bold text-green-100">Emotional Appeals</h3>
            </div>
            <div className="space-y-4">
              {emotionPhrases.map((phrase) => (
                <button
                  key={phrase.id}
                  onClick={() => handleEmotionSelect(phrase)}
                  className={`
                    w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left
                    ${selectedEmotion?.id === phrase.id
                      ? 'border-pink-400 bg-pink-100 shadow-xl scale-102'
                      : 'border-green-600 bg-green-700 hover:bg-green-600 hover:scale-101'
                    }
                  `}
                >
                  <div className={`
                    font-medium
                    ${selectedEmotion?.id === phrase.id ? 'text-pink-800' : 'text-green-100'}
                  `}>
                    {phrase.text}
                  </div>
                  <div className={`
                    text-sm mt-1 capitalize
                    ${selectedEmotion?.id === phrase.id ? 'text-pink-600' : 'text-green-300'}
                  `}>
                    {phrase.category}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Logic Phrases */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-green-100">Logical Support</h3>
            </div>
            <div className="space-y-4">
              {logicPhrases.map((phrase) => (
                <button
                  key={phrase.id}
                  onClick={() => handleLogicSelect(phrase)}
                  className={`
                    w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left
                    ${selectedLogic?.id === phrase.id
                      ? 'border-blue-400 bg-blue-100 shadow-xl scale-102'
                      : 'border-green-600 bg-green-700 hover:bg-green-600 hover:scale-101'
                    }
                  `}
                >
                  <div className={`
                    font-medium
                    ${selectedLogic?.id === phrase.id ? 'text-blue-800' : 'text-green-100'}
                  `}>
                    {phrase.text}
                  </div>
                  <div className={`
                    text-sm mt-1 capitalize
                    ${selectedLogic?.id === phrase.id ? 'text-blue-600' : 'text-green-300'}
                  `}>
                    {phrase.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Combination Area */}
        <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-bold text-green-100">Your Persuasive Phrase</h3>
          </div>

          {selectedEmotion || selectedLogic ? (
            <div className="bg-green-700/50 rounded-lg p-6 border border-green-600 mb-6">
              <div className="text-green-100 text-lg leading-relaxed">
                {selectedEmotion ? (
                  <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded">
                    {selectedEmotion.text}
                  </span>
                ) : (
                  <span className="text-green-400 italic">Select an emotional appeal...</span>
                )}
                {' '}
                {selectedLogic ? (
                  <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
                    {selectedLogic.text}
                  </span>
                ) : (
                  <span className="text-green-400 italic">Select logical support...</span>
                )}
                {canCombine && '.'}
              </div>
            </div>
          ) : (
            <div className="bg-green-700/30 rounded-lg p-6 border-2 border-dashed border-green-600 mb-6">
              <p className="text-green-300 text-center italic">
                Select one phrase from each column to create your persuasive combination
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleCombine}
              disabled={!canCombine}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
                ${canCombine
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-green-600 text-green-300 cursor-not-allowed'
                }
              `}
            >
              <Sparkles className="w-5 h-5" />
              Combine Phrases
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-green-100 px-6 py-4 rounded-full transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Created Phrases */}
        {createdPhrases.length > 0 && (
          <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-100 mb-6">Your Persuasive Arsenal</h3>
            <div className="space-y-4">
              {createdPhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border border-yellow-300 animate-fade-in"
                >
                  <div className="text-yellow-800 font-medium">
                    {index + 1}. {phrase}
                  </div>
                </div>
              ))}
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
            Created: {createdPhrases.length} phrases
          </div>

          <button
            onClick={handleComplete}
            disabled={!hasCreatedEnough}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
              ${hasCreatedEnough
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-green-600 text-green-300 cursor-not-allowed'
              }
            `}
          >
            Complete Challenge
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterTheMixChallenge;