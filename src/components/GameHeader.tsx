import React from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { GameProgress } from '../types/Game';

interface GameHeaderProps {
  progress: GameProgress;
  onViewChange: (view: 'home' | 'badges') => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ progress, onViewChange }) => {
  const xpToNextLevel = ((progress.level) * 200) - progress.totalXP;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Debate Quest</h1>
          <p className="text-purple-100">The Basics Battle</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-lg font-semibold">{progress.totalXP} XP</span>
            </div>
            <div className="text-sm text-purple-100">Level {progress.level}</div>
            <div className="text-xs text-purple-200">{xpToNextLevel} XP to next level</div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => onViewChange('badges')}
              className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">{progress.earnedBadges.length}/4</span>
            </button>
            <div className="text-xs text-purple-200 mt-1">Badges Earned</div>
          </div>
          
          {progress.module2Unlocked && (
            <div className="text-center">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5" />
                <span className="font-semibold text-white">Module 2 Unlocked!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameHeader;