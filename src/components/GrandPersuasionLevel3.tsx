import React, { useState } from 'react';
import { ArrowLeft, Crown, Star, Zap, Target, Users, Sparkles, Mic } from 'lucide-react';
import EmotionOrEvidenceChallenge from './EmotionOrEvidenceChallenge';
import AudienceMatchmakerChallenge from './AudienceMatchmakerChallenge';
import MasterTheMixChallenge from './MasterTheMixChallenge';
import GrandFinaleChallenge from './GrandFinaleChallenge';
import { 
  emotionEvidenceStatements, 
  audienceGroups, 
  toneOptions, 
  mixPhrases, 
  speechParts 
} from '../data/grandPersuasionData';

interface GrandPersuasionLevel3Props {
  onBack: () => void;
  onComplete: () => void;
}

const GrandPersuasionLevel3: React.FC<GrandPersuasionLevel3Props> = ({ onBack, onComplete }) => {
  const [currentChallenge, setCurrentChallenge] = useState<'menu' | 'emotion' | 'audience' | 'mix' | 'finale'>('menu');
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const challenges = [
    {
      id: 'emotion',
      title: 'Emotion or Evidence',
      description: 'Classify statements as emotional or factual',
      icon: Target,
      xp: 200,
      color: 'from-pink-400 to-pink-500'
    },
    {
      id: 'audience',
      title: 'Audience Matchmaker',
      description: 'Choose the right tone for each audience',
      icon: Users,
      xp: 250,
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: 'mix',
      title: 'Master the Mix',
      description: 'Combine emotion and logic phrases',
      icon: Sparkles,
      xp: 300,
      color: 'from-purple-400 to-purple-500'
    },
    {
      id: 'finale',
      title: 'The Grand Finale',
      description: 'Build and deliver your final speech',
      icon: Mic,
      xp: 500,
      color: 'from-orange-400 to-red-500'
    }
  ];

  const handleChallengeComplete = (challengeId: string, score: number) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setCompletedChallenges(prev => new Set([...prev, challengeId]));
      setTotalScore(prev => prev + challenge.xp);
      
      if (challengeId === 'finale') {
        setShowCompletion(true);
      } else {
        setCurrentChallenge('menu');
      }
    }
  };

  const handleStartChallenge = (challengeId: string) => {
    // Check if previous challenges are completed (except for finale)
    const challengeIndex = challenges.findIndex(c => c.id === challengeId);
    const previousChallenges = challenges.slice(0, challengeIndex);
    const allPreviousCompleted = previousChallenges.every(c => completedChallenges.has(c.id));
    
    if (allPreviousCompleted || challengeId === 'emotion') {
      setCurrentChallenge(challengeId as any);
    }
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-800 to-red-900 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Crown className="w-20 h-20 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-yellow-100 mb-6">Quest Complete!</h1>
          <p className="text-2xl text-yellow-200 mb-8">
            You are now a true Debate Champion!
          </p>
          
          <div className="bg-yellow-800/50 rounded-3xl shadow-2xl p-8 mb-8 border-2 border-yellow-600">
            <h2 className="text-3xl font-bold text-yellow-100 mb-6">🏆 All Levels Mastered!</h2>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-yellow-200">The Basics</h3>
                <p className="text-sm text-yellow-300">Fundamentals mastered</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-yellow-200">Fallacy Fighters</h3>
                <p className="text-sm text-yellow-300">Logic strengthened</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-yellow-200">Grand Persuasion</h3>
                <p className="text-sm text-yellow-300">Mastery achieved</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
              <Zap className="w-6 h-6" />
              <span className="font-bold text-xl">Total XP Earned: {totalScore}</span>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-6 rounded-full font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mx-auto"
          >
            <Crown className="w-8 h-8" />
            Claim Champion Status
          </button>
        </div>
      </div>
    );
  }

  if (currentChallenge === 'emotion') {
    return (
      <EmotionOrEvidenceChallenge
        data={emotionEvidenceStatements}
        onComplete={(score) => handleChallengeComplete('emotion', score)}
        onBack={() => setCurrentChallenge('menu')}
      />
    );
  }

  if (currentChallenge === 'audience') {
    return (
      <AudienceMatchmakerChallenge
        audiences={audienceGroups}
        toneOptions={toneOptions}
        onComplete={(score) => handleChallengeComplete('audience', score)}
        onBack={() => setCurrentChallenge('menu')}
      />
    );
  }

  if (currentChallenge === 'mix') {
    return (
      <MasterTheMixChallenge
        phrases={mixPhrases}
        onComplete={(score) => handleChallengeComplete('mix', score)}
        onBack={() => setCurrentChallenge('menu')}
      />
    );
  }

  if (currentChallenge === 'finale') {
    return (
      <GrandFinaleChallenge
        speechParts={speechParts}
        onComplete={(score) => handleChallengeComplete('finale', score)}
        onBack={() => setCurrentChallenge('menu')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="bg-green-700 hover:bg-green-600 text-green-100 p-3 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-green-100">The Grand Persuasion</h1>
            <p className="text-green-200 text-lg">Master the Art of Influence - Level 3</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {challenges.map((challenge, index) => {
            const IconComponent = challenge.icon;
            const isCompleted = completedChallenges.has(challenge.id);
            const isUnlocked = index === 0 || completedChallenges.has(challenges[index - 1].id);
            
            return (
              <button
                key={challenge.id}
                onClick={() => handleStartChallenge(challenge.id)}
                disabled={!isUnlocked}
                className={`
                  p-8 rounded-3xl border-2 transition-all duration-300 text-center
                  ${isCompleted
                    ? 'border-yellow-400 bg-yellow-100 shadow-xl'
                    : isUnlocked
                      ? 'border-green-600 bg-green-800 hover:bg-green-700 hover:scale-105 shadow-lg'
                      : 'border-green-700 bg-green-800/50 opacity-50 cursor-not-allowed'
                  }
                `}
              >
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
                  bg-gradient-to-br ${challenge.color}
                  ${!isUnlocked ? 'opacity-50' : ''}
                `}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${
                  isCompleted ? 'text-yellow-800' : isUnlocked ? 'text-green-100' : 'text-green-400'
                }`}>
                  {challenge.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  isCompleted ? 'text-yellow-700' : isUnlocked ? 'text-green-200' : 'text-green-500'
                }`}>
                  {challenge.description}
                </p>
                
                <div className={`flex items-center justify-center gap-2 ${
                  isCompleted ? 'text-yellow-600' : isUnlocked ? 'text-green-300' : 'text-green-500'
                }`}>
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">+{challenge.xp} XP</span>
                </div>
                
                {isCompleted && (
                  <div className="mt-3 inline-flex items-center gap-1 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4" />
                    Completed
                  </div>
                )}
                
                {!isUnlocked && (
                  <div className="mt-3 text-xs text-green-500">
                    Complete previous challenges to unlock
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-green-800 rounded-lg border-2 border-green-600 p-6 text-center">
          <h3 className="text-xl font-bold text-green-100 mb-2">Final Level Progress</h3>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-green-200">Challenges Completed:</span>
            <span className="text-2xl font-bold text-yellow-400">
              {completedChallenges.size}/{challenges.length}
            </span>
          </div>
          <div className="flex space-x-2 justify-center mb-4">
            {challenges.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${
                  completedChallenges.has(challenges[index].id) ? 'bg-yellow-400' : 'bg-green-600'
                }`}
              />
            ))}
          </div>
          {completedChallenges.size === challenges.length && (
            <div className="text-yellow-400 font-bold animate-pulse">
              🎉 Ready to become a Debate Champion! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrandPersuasionLevel3;