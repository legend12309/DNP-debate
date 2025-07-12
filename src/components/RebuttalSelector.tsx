import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface RebuttalSelectorProps {
  onNext: () => void;
}

const scenarios = [
  {
    id: 1,
    argument: "School uniforms eliminate bullying because everyone looks the same.",
    rebuttals: [
      { text: "That's completely wrong and stupid!", correct: false, feedback: "❌ This is a personal attack, not a logical rebuttal" },
      { text: "Studies show bullying often shifts to other differences like behavior or academic performance.", correct: true, feedback: "✅ Great! You used evidence to counter their claim" },
      { text: "I disagree with your opinion.", correct: false, feedback: "❌ This doesn't provide any reasoning or evidence" }
    ]
  },
  {
    id: 2,
    argument: "Homework should be banned because it causes stress for students.",
    rebuttals: [
      { text: "Homework teaches time management and reinforces classroom learning.", correct: true, feedback: "✅ Excellent! You provided counter-benefits of homework" },
      { text: "You're wrong about stress.", correct: false, feedback: "❌ This dismisses their point without explanation" },
      { text: "Some stress is normal and helps students prepare for real-world challenges.", correct: true, feedback: "✅ Good reframe! You turned their negative into a positive" }
    ]
  }
];

const RebuttalSelector: React.FC<RebuttalSelectorProps> = ({ onNext }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedRebuttal, setSelectedRebuttal] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const scenario = scenarios[currentScenario];

  const handleRebuttalSelect = (index: number) => {
    setSelectedRebuttal(index);
    setShowFeedback(true);
    
    if (scenario.rebuttals[index].correct) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedRebuttal(null);
      setShowFeedback(false);
    } else {
      onNext();
    }
  };

  const canProceed = showFeedback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Rebuttal</h1>
          <p className="text-lg text-gray-600">How would you respond to this argument?</p>
        </div>

        {/* Argument Speech Bubble */}
        <div className="relative bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Opponent's Argument:</h3>
              <p className="text-lg text-gray-700 leading-relaxed">{scenario.argument}</p>
            </div>
          </div>
          
          {/* Speech bubble tail */}
          <div className="absolute -bottom-4 left-16 w-8 h-8 bg-white transform rotate-45 border-r-2 border-b-2 border-blue-100"></div>
        </div>

        {/* Rebuttal Options */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Response:</h3>
          {scenario.rebuttals.map((rebuttal, index) => (
            <button
              key={index}
              onClick={() => handleRebuttalSelect(index)}
              disabled={showFeedback}
              className={`
                w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left
                ${selectedRebuttal === index
                  ? showFeedback
                    ? rebuttal.correct
                      ? 'border-green-400 bg-green-50 shadow-lg'
                      : 'border-red-400 bg-red-50 shadow-lg'
                    : 'border-blue-400 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-102'
                }
                ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold
                  ${selectedRebuttal === index && showFeedback
                    ? rebuttal.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {selectedRebuttal === index && showFeedback ? (
                    rebuttal.correct ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className="text-lg text-gray-800">{rebuttal.text}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && selectedRebuttal !== null && (
          <div className={`
            p-6 rounded-2xl mb-8 border-2 animate-fade-in
            ${scenario.rebuttals[selectedRebuttal].correct
              ? 'border-green-200 bg-green-50'
              : 'border-red-200 bg-red-50'
            }
          `}>
            <p className="text-lg font-medium text-gray-800">
              {scenario.rebuttals[selectedRebuttal].feedback}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-700">
              Scenario {currentScenario + 1}/{scenarios.length}
            </span>
            <div className="flex space-x-2">
              {scenarios.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${index <= currentScenario ? 'bg-purple-400' : 'bg-gray-200'}
                  `}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
              ${canProceed 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'Continue'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RebuttalSelector;