import React from 'react';
import { BookOpen, Trophy, Star, ArrowRight } from 'lucide-react';
import { GameState } from '../types/Game';
import SceneCard from './SceneCard';

interface HomeViewProps {
  gameState: GameState;
  onSceneStart: (sceneIndex: number) => void;
  onModule2Access: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ gameState, onSceneStart, onModule2Access }) => {
  const { scenes, progress } = gameState;
  
  const getSceneUnlockStatus = (sceneIndex: number) => {
    if (sceneIndex === 0) return true; // First scene always unlocked
    return progress.earnedBadges.includes(scenes[sceneIndex - 1].badge.id);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">Module 1: The Basics</h2>
          </div>
          <p className="text-gray-700 text-lg">
            Master the fundamentals of debate through four engaging scenes. 
            Complete all scenes to unlock Module 2!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenes.map((scene, index) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              index={index}
              isCompleted={progress.earnedBadges.includes(scene.badge.id)}
              isUnlocked={getSceneUnlockStatus(index)}
              onStart={() => onSceneStart(index)}
            />
          ))}
        </div>
      </div>
      
      {progress.module2Unlocked && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-yellow-200" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Module 2 Unlocked!</h3>
                <p className="text-yellow-100">
                  Congratulations! You've mastered the basics and can now access advanced techniques.
                </p>
              </div>
            </div>
            <button
              onClick={onModule2Access}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              Access Module 2
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Badges</h3>
          <p className="text-gray-600 mb-4">Collect all 4 badges to unlock the next module</p>
          <div className="text-2xl font-bold text-purple-600">
            {progress.earnedBadges.length}/4
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">XP</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Experience</h3>
          <p className="text-gray-600 mb-4">Earn XP by completing scenes and quizzes</p>
          <div className="text-2xl font-bold text-blue-600">
            {progress.totalXP}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">L{progress.level}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Level</h3>
          <p className="text-gray-600 mb-4">Level up as you gain experience</p>
          <div className="text-2xl font-bold text-green-600">
            {progress.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;