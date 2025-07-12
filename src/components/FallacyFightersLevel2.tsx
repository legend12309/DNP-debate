import React, { useState } from 'react';
import { ArrowLeft, Trophy, Star, Zap, Target } from 'lucide-react';
import FallacySpottingChallenge from './FallacySpottingChallenge';
import EvidenceEvaluationChallenge from './EvidenceEvaluationChallenge';
import ArgumentStructureChallenge from './ArgumentStructureChallenge';
import { fallacySpottingData, evidenceEvaluationData, argumentStructureData } from '../data/fallacyData';

interface FallacyFightersLevel2Props {
  onBack: () => void;
  onComplete: () => void;
}

const FallacyFightersLevel2: React.FC<FallacyFightersLevel2Props> = ({ onBack, onComplete }) => {
  const [currentChallenge, setCurrentChallenge] = useState<'menu' | 'spotting' | 'evidence' | 'structure'>('menu');
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [totalXP, setTotalXP] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const challenges = [
    {
      id: 'spotting',
      title: 'Fallacy Spotting',
      description: 'Identify logical fallacies in dialogues',
      icon: Target,
      xp: 150,
      color: 'from-red-400 to-red-500'
    },
    {
      id: 'evidence',
      title: 'Evidence Evaluation',
      description: 'Rate the strength of arguments',
      icon: Star,
      xp: 200,
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: 'structure',
      title: 'Argument Structure',
      description: 'Build logical argument flow',
      icon: Trophy,
      xp: 250,
      color: 'from-purple-400 to-purple-500'
    }
  ];

  const handleChallengeComplete = (challengeId: string, score: number) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setCompletedChallenges(prev => new Set([...prev, challengeId]));
      setTotalXP(prev => prev + challenge.xp);
      
      if (completedChallenges.size + 1 === challenges.length) {
        setShowCompletion(true);
      } else {
        setCurrentChallenge('menu');
      }
    }
  };

  const handleStartChallenge = (challengeId: string) => {
    setCurrentChallenge(challengeId as any);
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-green-100 mb-4">Level 2 Complete!</h1>
          <p className="text-xl text-green-200 mb-8">
            You've mastered logical reasoning and argument analysis!
          </p>
          
          <div className="bg-green-800 rounded-3xl shadow-xl p-8 mb-8 border-2 border-green-600">
            <h2 className="text-2xl font-bold text-green-100 mb-6">Fallacy Fighter Badge Earned!</h2>
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🛡️</span>
            </div>
            <p className="text-green-200 mb-4">You can now spot fallacies, evaluate evidence, and build strong arguments!</p>
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <Zap className="w-5 h-5" />
              <span className="font-bold">+{totalXP} XP Earned</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onBack}
              className="bg-green-700 hover:bg-green-600 text-green-100 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Return to Menu
            </button>
            
            <button
              onClick={onComplete}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Star className="w-5 h-5" />
              Unlock Level 3
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentChallenge === 'spotting') {
    return (
      <FallacySpottingChallenge
        data={fallacySpottingData}
        onComplete={(score) => handleChallengeComplete('spotting', score)}
        onBack={() => setCurrentChallenge('menu')}
      />
    );
  }

  if (currentChallenge === 'evidence') {
    return (
      <EvidenceEvaluationChallenge
        data={evidenceEvaluationData}
        onComplete={(score) => handleChallengeComplete('evidence', score)}
        onBack={() => setCurrentChallenge('menu')}
      />
    );
  }

  if (currentChallenge === 'structure') {
    return (
      <ArgumentStructureChallenge
        data={argumentStructureData}
        onComplete={(score) => handleChallengeComplete('structure', score)}
        onBack={() => setCurrentChallenge('menu')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="bg-green-700 hover:bg-green-600 text-green-100 p-3 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-green-100">Fallacy Fighters</h1>
            <p className="text-green-200">Strength in Logic - Level 2</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {challenges.map((challenge) => {
            const IconComponent = challenge.icon;
            const isCompleted = completedChallenges.has(challenge.id);
            
            return (
              <button
                key={challenge.id}
                onClick={() => handleStartChallenge(challenge.id)}
                disabled={isCompleted}
                className={`
                  p-8 rounded-3xl border-2 transition-all duration-300 text-center
                  ${isCompleted
                    ? 'border-yellow-400 bg-yellow-100 shadow-xl'
                    : 'border-green-600 bg-green-800 hover:bg-green-700 hover:scale-105 shadow-lg'
                  }
                `}
              >
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
                  bg-gradient-to-br ${challenge.color}
                `}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${isCompleted ? 'text-yellow-800' : 'text-green-100'}`}>
                  {challenge.title}
                </h3>
                <p className={`text-sm mb-4 ${isCompleted ? 'text-yellow-700' : 'text-green-200'}`}>
                  {challenge.description}
                </p>
                
                <div className={`flex items-center justify-center gap-2 ${isCompleted ? 'text-yellow-600' : 'text-green-300'}`}>
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">+{challenge.xp} XP</span>
                </div>
                
                {isCompleted && (
                  <div className="mt-3 inline-flex items-center gap-1 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Trophy className="w-4 h-4" />
                    Completed
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-green-800 rounded-lg border-2 border-green-600 p-6 text-center">
          <h3 className="text-xl font-bold text-green-100 mb-2">Progress</h3>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-green-200">Challenges Completed:</span>
            <span className="text-2xl font-bold text-yellow-400">
              {completedChallenges.size}/{challenges.length}
            </span>
          </div>
          <div className="flex space-x-2 justify-center">
            {challenges.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${
                  completedChallenges.has(challenges[index].id) ? 'bg-yellow-400' : 'bg-green-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallacyFightersLevel2