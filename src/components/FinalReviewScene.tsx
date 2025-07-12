import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Scale } from 'lucide-react';

interface FinalReviewSceneProps {
  onNext: () => void;
}

const categories = [
  {
    id: 'structure',
    name: 'Structure',
    speaker1: {
      title: 'Clear Organization',
      points: ['Logical flow of arguments', 'Strong opening statement', 'Effective transitions']
    },
    speaker2: {
      title: 'Scattered Approach',
      points: ['Jumped between topics', 'Weak introduction', 'Confusing structure']
    }
  },
  {
    id: 'evidence',
    name: 'Evidence',
    speaker1: {
      title: 'Strong Sources',
      points: ['Recent studies cited', 'Expert testimonials', 'Statistical data']
    },
    speaker2: {
      title: 'Weak Support',
      points: ['Outdated information', 'Personal opinions', 'Unreliable sources']
    }
  },
  {
    id: 'logic',
    name: 'Logic',
    speaker1: {
      title: 'Sound Reasoning',
      points: ['Clear cause-effect links', 'Addressed counterarguments', 'Logical conclusions']
    },
    speaker2: {
      title: 'Flawed Arguments',
      points: ['Logical fallacies present', 'Ignored opposing points', 'Weak conclusions']
    }
  }
];

const FinalReviewScene: React.FC<FinalReviewSceneProps> = ({ onNext }) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [winners, setWinners] = useState<{ [key: string]: 'speaker1' | 'speaker2' | null }>({});
  const [showResults, setShowResults] = useState(false);

  const category = categories[currentCategory];

  const handleWinnerSelect = (winner: 'speaker1' | 'speaker2') => {
    setWinners(prev => ({ ...prev, [category.id]: winner }));
  };

  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(prev => prev + 1);
    } else if (Object.keys(winners).length === categories.length) {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1);
    }
  };

  const canProceed = winners[category.id] !== undefined;
  const allCategoriesJudged = Object.keys(winners).length === categories.length;

  const speaker1Wins = Object.values(winners).filter(w => w === 'speaker1').length;
  const speaker2Wins = Object.values(winners).filter(w => w === 'speaker2').length;
  const overallWinner = speaker1Wins > speaker2Wins ? 'speaker1' : 'speaker2';

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Final Judgment</h1>
          
          <div className="relative mb-12">
            <Scale className={`
              w-32 h-32 mx-auto transition-all duration-1000
              ${overallWinner === 'speaker1' ? 'transform -rotate-12' : 'transform rotate-12'}
            `} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-xl
                bg-gradient-to-br ${overallWinner === 'speaker1' ? 'from-green-500 to-green-600' : 'from-purple-500 to-purple-600'}
              `}>
                {overallWinner === 'speaker1' ? '1' : '2'}
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Speaker {overallWinner === 'speaker1' ? '1' : '2'} Wins!
          </h2>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Score Breakdown</h3>
            <div className="grid grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="text-center">
                  <h4 className="font-semibold text-gray-700 mb-2">{cat.name}</h4>
                  <div className={`
                    w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-white
                    bg-gradient-to-br ${winners[cat.id] === 'speaker1' ? 'from-green-500 to-green-600' : 'from-purple-500 to-purple-600'}
                  `}>
                    {winners[cat.id] === 'speaker1' ? '1' : '2'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onNext}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Complete Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Judge the Debate</h1>
          <p className="text-lg text-gray-600">Compare both speakers in: {category.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Speaker 1 Card */}
          <button
            onClick={() => handleWinnerSelect('speaker1')}
            className={`
              p-8 rounded-3xl border-2 transition-all duration-300 text-left
              ${winners[category.id] === 'speaker1'
                ? 'border-green-400 bg-green-50 shadow-xl scale-105'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:scale-102'
              }
            `}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Speaker 1</h3>
                <p className="text-gray-600">{category.speaker1.title}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {category.speaker1.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </button>

          {/* Speaker 2 Card */}
          <button
            onClick={() => handleWinnerSelect('speaker2')}
            className={`
              p-8 rounded-3xl border-2 transition-all duration-300 text-left
              ${winners[category.id] === 'speaker2'
                ? 'border-purple-400 bg-purple-50 shadow-xl scale-105'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:scale-102'
              }
            `}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Speaker 2</h3>
                <p className="text-gray-600">{category.speaker2.title}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {category.speaker2.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentCategory === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300
              ${currentCategory === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-700">
              {currentCategory + 1}/{categories.length}
            </span>
            <div className="flex space-x-2">
              {categories.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${index <= currentCategory ? 'bg-blue-400' : 'bg-gray-200'}
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
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {currentCategory < categories.length - 1 ? 'Next Category' : allCategoriesJudged ? 'See Results' : 'Make Choice'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalReviewScene;