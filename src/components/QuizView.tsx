import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Award, Zap } from 'lucide-react';
import { Scene } from '../types/Game';

interface QuizViewProps {
  scene: Scene;
  onBack: () => void;
  onComplete: (score: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ scene, onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = scene.quiz.questions;
  const currentQ = questions[currentQuestion];
  const score = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleQuizComplete = () => {
    onComplete(score);
  };

  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  if (quizComplete) {
    const passed = score >= questions.length * 0.7; // 70% to pass
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-green-100">Great job on completing the {scene.title} quiz!</p>
          </div>
          
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-gray-600">
                {Math.round((score / questions.length) * 100)}% Correct
              </div>
            </div>
            
            {passed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Congratulations!</h3>
                <p className="text-green-700">
                  You've earned the <strong>{scene.badge.name}</strong> badge and <strong>{scene.xpReward} XP</strong>!
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <XCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Keep Learning!</h3>
                <p className="text-yellow-700">
                  You need 70% or higher to earn the badge. Review the content and try again!
                </p>
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={onBack}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Scenes
              </button>
              
              {passed && (
                <button
                  onClick={handleQuizComplete}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
                >
                  <Zap className="w-4 h-4" />
                  Claim Rewards
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Scene
          </button>
          <h1 className="text-2xl font-bold mb-2">{scene.title} Quiz</h1>
          <div className="text-purple-100">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        
        <div className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">Progress</div>
              <div className="text-sm text-gray-600">{currentQuestion + 1}/{questions.length}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`
                    w-full p-4 text-left rounded-lg border-2 transition-all
                    ${selectedAnswer === index 
                      ? showResult 
                        ? index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                        : 'border-purple-500 bg-purple-50 text-purple-800'
                      : showResult && index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${selectedAnswer === index 
                        ? showResult 
                          ? index === currentQ.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : 'border-purple-500 bg-purple-500'
                        : showResult && index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }
                    `}>
                      {showResult && ((selectedAnswer === index && index === currentQ.correctAnswer) || 
                        (selectedAnswer !== index && index === currentQ.correctAnswer)) && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                      {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {showResult && (
            <div className={`
              p-4 rounded-lg mb-6
              ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
            `}>
              <div className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <div className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {currentQ.explanation}
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <div className="text-sm text-gray-600">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>
            
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`
                  px-6 py-2 rounded-lg transition-all
                  ${selectedAnswer === null
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                  }
                `}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizView;