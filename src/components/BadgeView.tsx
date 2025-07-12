import React from 'react';
import { ArrowLeft, Trophy, Lock } from 'lucide-react';
import { Scene } from '../types/Game';

interface BadgeViewProps {
  scenes: Scene[];
  earnedBadges: string[];
  onBack: () => void;
}

const BadgeView: React.FC<BadgeViewProps> = ({ scenes, earnedBadges, onBack }) => {
  const getBadgeIcon = (iconName: string) => {
    switch(iconName) {
      case 'Users': return '👥';
      case 'BookOpen': return '📚';
      case 'Shield': return '🛡️';
      case 'Star': return '⭐';
      default: return '🏆';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold mb-2">Badge Collection</h1>
              <p className="text-yellow-100">Your achievements in Debate Quest</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenes.map((scene) => {
              const isEarned = earnedBadges.includes(scene.badge.id);
              
              return (
                <div
                  key={scene.id}
                  className={`
                    relative p-6 rounded-lg border-2 transition-all
                    ${isEarned 
                      ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50' 
                      : 'border-gray-200 bg-gray-50'
                    }
                  `}
                >
                  {!isEarned && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center text-3xl
                      ${isEarned 
                        ? `bg-gradient-to-br ${scene.badge.color}` 
                        : 'bg-gray-300'
                      }
                    `}>
                      {isEarned ? getBadgeIcon(scene.badge.icon) : '🔒'}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`
                        text-xl font-bold mb-2
                        ${isEarned ? 'text-gray-800' : 'text-gray-500'}
                      `}>
                        {scene.badge.name}
                      </h3>
                      <p className={`
                        text-sm mb-3
                        ${isEarned ? 'text-gray-700' : 'text-gray-500'}
                      `}>
                        {scene.badge.description}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className={`
                          text-sm font-medium
                          ${isEarned ? 'text-gray-700' : 'text-gray-500'}
                        `}>
                          {scene.title}
                        </div>
                        <div className={`
                          text-sm
                          ${isEarned ? 'text-gray-600' : 'text-gray-500'}
                        `}>
                          +{scene.xpReward} XP
                        </div>
                      </div>
                      
                      {isEarned && (
                        <div className="mt-3 inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          <Trophy className="w-3 h-3" />
                          Earned
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Progress Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {earnedBadges.length}/{scenes.length}
                </div>
                <div className="text-sm text-gray-600">Badges Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((earnedBadges.length / scenes.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
            
            {earnedBadges.length === scenes.length && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold text-lg">Congratulations!</div>
                <div className="text-sm">You've unlocked Module 2!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeView;