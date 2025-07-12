import React from 'react';
import { CheckCircle, Lock, Play } from 'lucide-react';
import { Scene } from '../types/Game';

interface SceneCardProps {
  scene: Scene;
  index: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  onStart: () => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ 
  scene, 
  index, 
  isCompleted, 
  isUnlocked, 
  onStart 
}) => {
  const getIconComponent = () => {
    switch(scene.badge.icon) {
      case 'Users': return <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">U</div>;
      case 'BookOpen': return <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">B</div>;
      case 'Shield': return <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">S</div>;
      case 'Star': return <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">⭐</div>;
      default: return <div className="w-8 h-8 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div className={`
      relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300
      ${isUnlocked ? 'hover:shadow-xl hover:scale-105 cursor-pointer' : 'opacity-60'}
    `}>
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
          <div className="bg-white rounded-full p-3">
            <Lock className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {getIconComponent()}
            <div>
              <h3 className="text-lg font-bold text-gray-800">{scene.title}</h3>
              <p className="text-sm text-gray-600">Scene {index + 1}</p>
            </div>
          </div>
          
          {isCompleted && (
            <CheckCircle className="w-6 h-6 text-green-500" />
          )}
        </div>
        
        <p className="text-gray-700 mb-4">{scene.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">+{scene.xpReward} XP</span>
            <span>•</span>
            <span>{scene.badge.name}</span>
          </div>
          
          {isUnlocked && (
            <button
              onClick={onStart}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              <Play className="w-4 h-4" />
              {isCompleted ? 'Review' : 'Start'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneCard;