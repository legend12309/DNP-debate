import { useState, useEffect } from 'react';
import { GameState, GameProgress } from '../types/Game';
import { scenes } from '../data/gameData';

const initialProgress: GameProgress = {
  currentScene: 0,
  totalXP: 0,
  level: 1,
  earnedBadges: [],
  sceneProgress: {},
  module2Unlocked: false
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    scenes,
    progress: initialProgress,
    currentView: 'home',
    selectedScene: 0
  });

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('debateQuestProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setGameState(prev => ({ ...prev, progress }));
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('debateQuestProgress', JSON.stringify(gameState.progress));
  }, [gameState.progress]);

  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / 200) + 1;
  };

  const addXP = (amount: number) => {
    setGameState(prev => {
      const newXP = prev.progress.totalXP + amount;
      const newLevel = calculateLevel(newXP);
      return {
        ...prev,
        progress: {
          ...prev.progress,
          totalXP: newXP,
          level: newLevel
        }
      };
    });
  };

  const earnBadge = (badgeId: string) => {
    setGameState(prev => {
      const newBadges = [...prev.progress.earnedBadges, badgeId];
      const module2Unlocked = newBadges.length === scenes.length;
      
      return {
        ...prev,
        progress: {
          ...prev.progress,
          earnedBadges: newBadges,
          module2Unlocked
        }
      };
    });
  };

  const completeScene = (sceneId: string) => {
    setGameState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        sceneProgress: {
          ...prev.progress.sceneProgress,
          [sceneId]: true
        }
      }
    }));
  };

  const setCurrentView = (view: GameState['currentView']) => {
    setGameState(prev => ({ ...prev, currentView: view }));
  };

  const setSelectedScene = (sceneIndex: number) => {
    setGameState(prev => ({ ...prev, selectedScene: sceneIndex }));
  };

  return {
    gameState,
    addXP,
    earnBadge,
    completeScene,
    setCurrentView,
    setSelectedScene
  };
};