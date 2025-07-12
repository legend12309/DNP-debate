import React, { useState } from 'react';
import { ArrowRight, Trophy, Star, Zap, Lock, Users, GraduationCap, Building } from 'lucide-react';

interface AudienceMatchmakerSceneProps {
  onNext: () => void;
}

const audienceData = [
  {
    id: 'students',
    name: 'Students',
    icon: GraduationCap,
    color: 'from-blue-400 to-blue-500',
    description: 'High school teenagers',
    correctStatement: "Look, uniforms basically kill our creativity and make us all look like robots. We should be able to express ourselves through what we wear.",
    statements: [
      "Look, uniforms basically kill our creativity and make us all look like robots. We should be able to express ourselves through what we wear.",
      "School uniforms provide structure and eliminate distractions, allowing students to focus on academic achievement rather than fashion competition.",
      "Research indicates that uniform policies correlate with improved attendance rates and reduced disciplinary incidents across educational institutions."
    ]
  },
  {
    id: 'parents',
    name: 'Parents',
    icon: Users,
    color: 'from-pink-400 to-pink-500',
    description: 'Concerned families',
    correctStatement: "As parents, we want our children to develop good habits and focus on learning. Uniforms help create structure and reduce morning stress.",
    statements: [
      "Uniforms are totally unfair and take away our freedom to choose what we want to wear to school every day.",
      "As parents, we want our children to develop good habits and focus on learning. Uniforms help create structure and reduce morning stress.",
      "Statistical analysis demonstrates measurable improvements in academic performance metrics following uniform policy implementation."
    ]
  },
  {
    id: 'officials',
    name: 'School Board',
    icon: Building,
    color: 'from-purple-400 to-purple-500',
    description: 'Educational administrators',
    correctStatement: "Data from 47 school districts shows uniform policies reduce disciplinary incidents by 23% and improve graduation rates by 8%.",
    statements: [
      "Uniforms are just another way to control students and take away their basic rights to self-expression and individuality.",
      "Uniforms help families save money and reduce the pressure on children to wear expensive designer clothes to fit in.",
      "Data from 47 school districts shows uniform policies reduce disciplinary incidents by 23% and improve graduation rates by 8%."
    ]
  }
];

const AudienceMatchmakerScene: React.FC<AudienceMatchmakerSceneProps> = ({ onNext }) => {
  const [currentAudience, setCurrentAudience] = useState(0);
  const [selectedStatement, setSelectedStatement] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [xp, setXp] = useState(0);
  const [completedAudiences, setCompletedAudiences] = useState<Set<number>>(new Set());
  const [audienceResults, setAudienceResults] = useState<{ [key: number]: boolean }>({});

  const currentAudienceData = audienceData[currentAudience];
  const IconComponent = currentAudienceData.icon;
  const maxXP = 30; // 3 audiences × 10 XP each
  const requiredXP = 20; // Need at least 2 correct to proceed
  const canProceed = xp >= requiredXP;
  const allAudiencesCompleted = completedAudiences.size === audienceData.length;

  const handleStatementSelect = (statement: string) => {
    if (completedAudiences.has(currentAudience)) return;
    
    setSelectedStatement(statement);
    setShowFeedback(true);
    
    const isCorrect = statement === currentAudienceData.correctStatement;
    const xpChange = isCorrect ? 10 : -5;
    
    setXp(prev => Math.max(0, prev + xpChange));
    setCompletedAudiences(prev => new Set([...prev, currentAudience]));
    setAudienceResults(prev => ({ ...prev, [currentAudience]: isCorrect }));
  };

  const handleNextAudience = () => {
    if (currentAudience < audienceData.length - 1) {
      setCurrentAudience(prev => prev + 1);
      setSelectedStatement(null);
      setShowFeedback(false);
    }
  };

  const handlePreviousAudience = () => {
    if (currentAudience > 0) {
      setCurrentAudience(prev => prev - 1);
      setSelectedStatement(null);
      setShowFeedback(false);
    }
  };

  const isCurrentAudienceCompleted = completedAudiences.has(currentAudience);
  const currentAudienceResult = audienceResults[currentAudience];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-800 px-6 py-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header with XP Tracker */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-50" style={{ fontFamily: 'Caveat, cursive' }}>
            🎯 Audience Matchmaker
          </h1>
          
          <div className="bg-green-600/30 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-yellow-300" />
              <span className="text-green-50 font-semibold text-lg">{xp} / {requiredXP} XP</span>
              {canProceed && (
                <div className="animate-bounce">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
              )}
            </div>
            
            {/* Animated XP Progress Bar */}
            <div className="w-32 bg-green-700/50 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min((xp / requiredXP) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Audience Card */}
        <div className="bg-green-600/20 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-400/30 overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${currentAudienceData.color}/30 p-6 border-b border-green-400/30`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentAudienceData.color} flex items-center justify-center`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-50" style={{ fontFamily: 'Caveat, cursive' }}>
                    {currentAudienceData.name}
                  </h2>
                  <p className="text-green-200">{currentAudienceData.description}</p>
                </div>
              </div>
              {isCurrentAudienceCompleted && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  currentAudienceResult ? 'bg-green-400/30 text-green-100' : 'bg-red-400/30 text-red-100'
                }`}>
                  <span className="text-lg">{currentAudienceResult ? '✅' : '❌'}</span>
                  <span className="font-semibold">
                    {currentAudienceResult ? '+10 XP' : '-5 XP'}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8">
            <h3 className="text-xl font-semibold text-green-50 mb-6 text-center">
              Which statement would be most persuasive for this audience?
            </h3>
            
            <div className="space-y-4">
              {currentAudienceData.statements.map((statement, index) => (
                <button
                  key={index}
                  onClick={() => handleStatementSelect(statement)}
                  disabled={isCurrentAudienceCompleted}
                  className={`
                    w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform
                    ${isCurrentAudienceCompleted
                      ? statement === currentAudienceData.correctStatement
                        ? 'border-green-400 bg-green-400/20 text-green-100 scale-102'
                        : selectedStatement === statement
                          ? 'border-red-400 bg-red-400/20 text-red-100'
                          : 'border-green-500/30 bg-green-600/10 text-green-200 opacity-60'
                      : 'border-green-400/50 bg-green-500/10 text-green-100 hover:border-pink-300 hover:bg-pink-400/10 hover:scale-102 cursor-pointer'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold mt-1
                      ${isCurrentAudienceCompleted && statement === currentAudienceData.correctStatement
                        ? 'border-green-400 bg-green-400 text-green-900'
                        : isCurrentAudienceCompleted && selectedStatement === statement && statement !== currentAudienceData.correctStatement
                          ? 'border-red-400 bg-red-400 text-red-900'
                          : 'border-green-300 text-green-300'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium leading-relaxed">{statement}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && isCurrentAudienceCompleted && (
          <div className={`
            rounded-2xl p-6 mb-8 border-2 animate-fade-in
            ${currentAudienceResult 
              ? 'bg-green-400/20 border-green-400/50 text-green-100' 
              : 'bg-red-400/20 border-red-400/50 text-red-100'
            }
          `}>
            <div className="flex items-start gap-4">
              <div className="text-3xl">
                {currentAudienceResult ? '🎉' : '💡'}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">
                  {currentAudienceResult ? '✅ Perfect Match! +10 XP' : '❌ Not the best fit! -5 XP'}
                </h4>
                <p className="leading-relaxed">
                  {currentAudienceResult 
                    ? `Great choice! This tone resonates well with ${currentAudienceData.name.toLowerCase()}.`
                    : `${currentAudienceData.name} would respond better to a different approach. Consider their perspective and values.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousAudience}
            disabled={currentAudience === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${currentAudience === 0
                ? 'bg-green-600/30 text-green-400 cursor-not-allowed'
                : 'bg-mint-400/20 text-mint-100 border border-mint-300/50 hover:bg-mint-400/30 hover:scale-105'
              }
            `}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-4">
            {/* Audience indicators */}
            <div className="flex space-x-2">
              {audienceData.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    completedAudiences.has(index)
                      ? audienceResults[index]
                        ? 'bg-green-400'
                        : 'bg-red-400'
                      : index === currentAudience
                        ? 'bg-yellow-400'
                        : 'bg-green-600'
                  }`}
                />
              ))}
            </div>

            {currentAudience < audienceData.length - 1 ? (
              <button
                onClick={handleNextAudience}
                disabled={!isCurrentAudienceCompleted}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300
                  ${isCurrentAudienceCompleted
                    ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:scale-105 shadow-lg'
                    : 'bg-green-600/30 text-green-400 cursor-not-allowed'
                  }
                `}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={onNext}
                disabled={!canProceed}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300
                  ${canProceed
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 hover:scale-105 shadow-xl'
                    : 'bg-green-600/30 text-green-400 cursor-not-allowed'
                  }
                `}
              >
                {canProceed ? (
                  <>
                    <Star className="w-6 h-6" />
                    Proceed to Next Scene
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    Earn more XP to continue 🔒
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Floating Badge for Achievement */}
        {canProceed && (
          <div className="fixed top-20 right-8 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-4 shadow-2xl">
              <Trophy className="w-8 h-8 text-green-900" />
            </div>
          </div>
        )}

        {/* Completion Badge */}
        {allAudiencesCompleted && canProceed && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-yellow-400 animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-100 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                Audience Ace! 🎉
              </h3>
              <p className="text-green-100">You've unlocked the next challenge. Get ready!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudienceMatchmakerScene;