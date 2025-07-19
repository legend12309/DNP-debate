export interface Scene {
  id: string;
  title: string;
  description: string;
  content: {
    introduction: string;
    keyPoints: string[];
    example: string;
    tips: string[];
  };
  quiz: Quiz;
  xpReward: number;
  badge: Badge;
}

export interface Quiz {
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface GameProgress {
  currentScene: number;
  totalXP: number;
  level: number;
  earnedBadges: string[];
  sceneProgress: { [key: string]: boolean };
  module2Unlocked: boolean;
  levelXP: { [key: string]: number };
  retakeCount: { [key: string]: number };
  aiInsights: { [key: string]: string };
}

export interface GameState {
  scenes: Scene[];
  progress: GameProgress;
  currentView: 'home' | 'scene' | 'quiz' | 'badges' | 'module2';
  selectedScene: number;
}