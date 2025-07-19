import React from 'react';
import { RotateCcw, Trophy, Zap, ArrowRight } from 'lucide-react';

interface RetakeLevelScreenProps {
  levelName: string;
  currentXP: number;
  requiredXP: number;
  onRetake: () => void;
  onBack: () => void;
}

const RetakeLevelScreen: React.FC<RetakeLevelScreenProps> = ({
  levelName,
  currentXP,
  requiredXP,
  onRetake,
  onBack
}) => {
  const xpNeeded = requiredXP - currentXP;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Chalkboard Effect */}
        <div className="bg-green-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-green-600 p-8 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <RotateCcw className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-green-100 mb-4">Almost There!</h1>
          <p className="text-green-200 text-lg mb-6">
            You earned <span className="text-yellow-400 font-bold">{currentXP} XP</span> in {levelName}, 
            but need <span className="text-yellow-400 font-bold">{requiredXP} XP</span> to continue.
          </p>
          
          <div className="bg-green-700/50 rounded-2xl p-6 mb-6 border border-green-600">
            <div className="flex items-center justify-between mb-3">
              <span className="text-green-300">Progress</span>
              <span className="text-green-300">{currentXP}/{requiredXP} XP</span>
            </div>
            <div className="w-full bg-green-600 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(currentXP / requiredXP) * 100}%` }}
              />
            </div>
            <p className="text-green-400 text-sm mt-2">
              You need {xpNeeded} more XP to unlock the next level
            </p>
          </div>

          <div className="bg-blue-100 border-2 border-blue-300 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-blue-800">Motivational Boost</h3>
            </div>
            <p className="text-blue-700 italic">
              "Give it another shot — debate mastery takes practice! Every great debater has faced setbacks."
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onBack}
              className="bg-green-700 hover:bg-green-600 text-green-100 px-6 py-3 rounded-full transition-all duration-300"
            >
              Back to Menu
            </button>
            
            <button
              onClick={onRetake}
              className="flex items-center gap-3 bg-gradient-to-r from-red-400 to-pink-400 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>

        <div className="text-green-300 text-sm">
          💡 Tip: Focus on accuracy over speed to maximize your XP!
        </div>
      </div>
    </div>
  );
};

export default RetakeLevelScreen;