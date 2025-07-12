import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Move } from 'lucide-react';
import { ArgumentStructureData } from '../types/FallacyGame';

interface ArgumentStructureChallengeProps {
  data: ArgumentStructureData[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

const ArgumentStructureChallenge: React.FC<ArgumentStructureChallengeProps> = ({ data, onComplete, onBack }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [blockOrder, setBlockOrder] = useState<string[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const scenario = data[currentScenario];
  const isComplete = blockOrder.length === scenario.blocks.length;
  const isCorrect = JSON.stringify(blockOrder) === JSON.stringify(scenario.correctOrder);

  const handleDragStart = (blockId: string) => {
    setDraggedBlock(blockId);
  };

  const handleDrop = (position: number) => {
    if (draggedBlock) {
      const newOrder = [...blockOrder];
      const existingIndex = newOrder.indexOf(draggedBlock);
      
      if (existingIndex !== -1) {
        newOrder.splice(existingIndex, 1);
      }
      
      newOrder.splice(position, 0, draggedBlock);
      setBlockOrder(newOrder);
      setDraggedBlock(null);
    }
  };

  const handleBlockClick = (blockId: string) => {
    if (!blockOrder.includes(blockId)) {
      setBlockOrder(prev => [...prev, blockId]);
    }
  };

  const handleRemoveBlock = (blockId: string) => {
    setBlockOrder(prev => prev.filter(id => id !== blockId));
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < data.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setBlockOrder([]);
      setShowFeedback(false);
    } else {
      onComplete(score);
    }
  };

  const getBlockColor = (type: string) => {
    switch (type) {
      case 'claim': return 'from-blue-400 to-blue-500';
      case 'evidence': return 'from-green-400 to-green-500';
      case 'rebuttal': return 'from-purple-400 to-purple-500';
      case 'conclusion': return 'from-orange-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'claim': return '🎯';
      case 'evidence': return '📊';
      case 'rebuttal': return '⚖️';
      case 'conclusion': return '🏁';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-100 mb-4">Build Argument Structure</h1>
          <p className="text-green-200 text-lg">Drag blocks into the correct order</p>
        </div>

        {/* Scenario */}
        <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-6 mb-8">
          <div className="text-green-300 text-sm mb-4">
            Scenario {currentScenario + 1}/{data.length}
          </div>
          <h3 className="text-green-100 text-xl font-bold mb-4">Topic:</h3>
          <p className="text-green-200 text-lg">{scenario.scenario}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Blocks */}
          <div>
            <h3 className="text-green-100 text-xl font-bold mb-4">Available Blocks:</h3>
            <div className="space-y-4">
              {scenario.blocks
                .filter(block => !blockOrder.includes(block.id))
                .map((block) => (
                  <div
                    key={block.id}
                    onClick={() => handleBlockClick(block.id)}
                    className={`
                      p-4 rounded-lg border-2 border-green-600 bg-gradient-to-r ${getBlockColor(block.type)}
                      cursor-pointer hover:scale-102 transition-all duration-300 shadow-lg
                    `}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getBlockIcon(block.type)}</span>
                      <span className="font-bold text-white capitalize">{block.type}</span>
                      <Move className="w-4 h-4 text-white ml-auto" />
                    </div>
                    <p className="text-white text-sm">{block.text}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Argument Structure */}
          <div>
            <h3 className="text-green-100 text-xl font-bold mb-4">Your Argument Structure:</h3>
            <div className="space-y-4 min-h-96">
              {blockOrder.map((blockId, index) => {
                const block = scenario.blocks.find(b => b.id === blockId)!;
                return (
                  <div
                    key={blockId}
                    onClick={() => handleRemoveBlock(blockId)}
                    className={`
                      p-4 rounded-lg border-2 bg-gradient-to-r ${getBlockColor(block.type)}
                      cursor-pointer hover:scale-102 transition-all duration-300 shadow-lg
                      ${showFeedback && blockId === scenario.correctOrder[index]
                        ? 'border-green-300 shadow-green-300/50'
                        : showFeedback
                          ? 'border-red-300 shadow-red-300/50'
                          : 'border-green-600'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-white">{index + 1}.</span>
                      <span className="text-2xl">{getBlockIcon(block.type)}</span>
                      <span className="font-bold text-white capitalize">{block.type}</span>
                      {showFeedback && blockId === scenario.correctOrder[index] && (
                        <CheckCircle className="w-5 h-5 text-green-300 ml-auto" />
                      )}
                    </div>
                    <p className="text-white text-sm">{block.text}</p>
                  </div>
                );
              })}
              
              {blockOrder.length === 0 && (
                <div className="border-2 border-dashed border-green-600 rounded-lg p-8 text-center">
                  <p className="text-green-300">Click blocks to add them here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`
            border-2 rounded-lg p-6 mt-8 animate-fade-in
            ${isCorrect 
              ? 'bg-green-100 border-green-300' 
              : 'bg-red-100 border-red-300'
            }
          `}>
            <div className="flex items-start gap-3">
              <div className="text-2xl">{isCorrect ? '✅' : '❌'}</div>
              <div>
                <h3 className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Perfect Structure!' : 'Not quite right'}
                </h3>
                <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect 
                    ? 'You built a strong logical argument structure!'
                    : 'The correct order is: Claim → Evidence → Rebuttal → Conclusion'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onBack}
            className="bg-green-700 hover:bg-green-600 text-green-100 px-6 py-3 rounded-full transition-all duration-300"
          >
            Back
          </button>

          <div className="text-green-300">
            Score: {score}/{currentScenario + (showFeedback ? 1 : 0)}
          </div>

          {!showFeedback ? (
            <button
              onClick={handleCheck}
              disabled={!isComplete}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
                ${isComplete
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-green-600 text-green-300 cursor-not-allowed'
                }
              `}
            >
              Check Structure
              <CheckCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              {currentScenario < data.length - 1 ? 'Next Scenario' : 'Complete Challenge'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArgumentStructureChallenge