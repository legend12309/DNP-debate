import React, { useState } from 'react';
import { ArrowRight, Trophy, Star, Zap, Lock } from 'lucide-react';

interface FallacySpottingSceneProps {
  onNext: () => void;
}

const fallacyQuestions = [
  {
    id: 1,
    question: "Which of these is an example of an Ad Hominem fallacy?",
    options: [
      "Your argument is wrong because you're too young to understand politics.",
      "Studies show that 70% of experts disagree with this policy.",
      "This policy has failed in three other countries.",
      "The evidence suggests a different conclusion."
    ],
    correctAnswer: 0,
    explanation: "Ad Hominem attacks the person making the argument rather than addressing the argument itself."
  },
  {
    id: 2,
    question: "Identify the Slippery Slope fallacy:",
    options: [
      "This policy costs too much money for our budget.",
      "If we allow students to retake one test, soon they'll want to retake entire courses, then degrees, and our education system will collapse.",
      "Research from Harvard University supports this approach.",
      "Three independent studies reached the same conclusion."
    ],
    correctAnswer: 1,
    explanation: "Slippery Slope assumes that one small step will inevitably lead to extreme consequences without evidence."
  },
  {
    id: 3,
    question: "Which statement shows a Straw Man fallacy?",
    options: [
      "Opponent says: 'We should reduce military spending.' Response: 'My opponent wants to leave our country defenseless against all threats.'",
      "The data clearly shows a 15% increase over five years.",
      "Expert testimony supports this position.",
      "This approach has worked successfully in similar situations."
    ],
    correctAnswer: 0,
    explanation: "Straw Man misrepresents someone's argument to make it easier to attack."
  },
  {
    id: 4,
    question: "Spot the Appeal to Popularity (Bandwagon) fallacy:",
    options: [
      "Scientific evidence demonstrates this theory is correct.",
      "The majority of peer-reviewed studies support this conclusion.",
      "Everyone knows that social media is bad for teenagers, so it must be true.",
      "Data from multiple countries shows consistent results."
    ],
    correctAnswer: 2,
    explanation: "Appeal to Popularity assumes something is true just because many people believe it, without providing evidence."
  }
];

const FallacySpottingScene: React.FC<FallacySpottingSceneProps> = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [xp, setXp] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [questionResults, setQuestionResults] = useState<{ [key: number]: boolean }>({});

  const currentQ = fallacyQuestions[currentQuestion];
  const maxXP = 40; // 4 questions × 10 XP each
  const requiredXP = 30;
  const canProceed = xp >= requiredXP;
  const allQuestionsAnswered = answeredQuestions.size === fallacyQuestions.length;

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions.has(currentQuestion)) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const isCorrect = answerIndex === currentQ.correctAnswer;
    const xpChange = isCorrect ? 10 : -5;
    
    setXp(prev => Math.max(0, prev + xpChange));
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
    setQuestionResults(prev => ({ ...prev, [currentQuestion]: isCorrect }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < fallacyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const isCurrentQuestionAnswered = answeredQuestions.has(currentQuestion);
  const currentQuestionResult = questionResults[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-800 px-6 py-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header with XP Tracker */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-50" style={{ fontFamily: 'Caveat, cursive' }}>
            🧠 Fallacy Spotting
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

        {/* Question Card */}
        <div className="bg-green-600/20 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-400/30 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500/30 to-green-400/30 p-6 border-b border-green-400/30">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-green-50" style={{ fontFamily: 'Caveat, cursive' }}>
                Question {currentQuestion + 1} of {fallacyQuestions.length}
              </h2>
              {isCurrentQuestionAnswered && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  currentQuestionResult ? 'bg-green-400/30 text-green-100' : 'bg-red-400/30 text-red-100'
                }`}>
                  <span className="text-lg">{currentQuestionResult ? '✅' : '❌'}</span>
                  <span className="font-semibold">
                    {currentQuestionResult ? '+10 XP' : '-5 XP'}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8">
            <h3 className="text-xl font-semibold text-green-50 mb-8 leading-relaxed">
              {currentQ.question}
            </h3>
            
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isCurrentQuestionAnswered}
                  className={`
                    w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform
                    ${isCurrentQuestionAnswered
                      ? index === currentQ.correctAnswer
                        ? 'border-green-400 bg-green-400/20 text-green-100 scale-102'
                        : selectedAnswer === index
                          ? 'border-red-400 bg-red-400/20 text-red-100'
                          : 'border-green-500/30 bg-green-600/10 text-green-200 opacity-60'
                      : 'border-green-400/50 bg-green-500/10 text-green-100 hover:border-pink-300 hover:bg-pink-400/10 hover:scale-102 cursor-pointer'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
                      ${isCurrentQuestionAnswered && index === currentQ.correctAnswer
                        ? 'border-green-400 bg-green-400 text-green-900'
                        : isCurrentQuestionAnswered && selectedAnswer === index && index !== currentQ.correctAnswer
                          ? 'border-red-400 bg-red-400 text-red-900'
                          : 'border-green-300 text-green-300'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && isCurrentQuestionAnswered && (
          <div className={`
            rounded-2xl p-6 mb-8 border-2 animate-fade-in
            ${currentQuestionResult 
              ? 'bg-green-400/20 border-green-400/50 text-green-100' 
              : 'bg-red-400/20 border-red-400/50 text-red-100'
            }
          `}>
            <div className="flex items-start gap-4">
              <div className="text-3xl">
                {currentQuestionResult ? '🎉' : '💡'}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">
                  {currentQuestionResult ? '✅ Correct! +10 XP' : '❌ Not quite! -5 XP'}
                </h4>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${currentQuestion === 0
                ? 'bg-green-600/30 text-green-400 cursor-not-allowed'
                : 'bg-mint-400/20 text-mint-100 border border-mint-300/50 hover:bg-mint-400/30 hover:scale-105'
              }
            `}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-4">
            {/* Question indicators */}
            <div className="flex space-x-2">
              {fallacyQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    answeredQuestions.has(index)
                      ? questionResults[index]
                        ? 'bg-green-400'
                        : 'bg-red-400'
                      : index === currentQuestion
                        ? 'bg-yellow-400'
                        : 'bg-green-600'
                  }`}
                />
              ))}
            </div>

            {currentQuestion < fallacyQuestions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                disabled={!isCurrentQuestionAnswered}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300
                  ${isCurrentQuestionAnswered
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
      </div>
    </div>
  );
};

export default FallacySpottingScene;