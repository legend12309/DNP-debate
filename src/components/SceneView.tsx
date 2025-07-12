import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Target, CheckCircle } from 'lucide-react';
import { Scene } from '../types/Game';

interface SceneViewProps {
  scene: Scene;
  onBack: () => void;
  onStartQuiz: () => void;
}

const SceneView: React.FC<SceneViewProps> = ({ scene, onBack, onStartQuiz }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Introduction',
      icon: BookOpen,
      content: scene.content.introduction
    },
    {
      title: 'Key Points',
      icon: Target,
      content: scene.content.keyPoints
    },
    {
      title: 'Example',
      icon: Lightbulb,
      content: scene.content.example
    },
    {
      title: 'Tips',
      icon: CheckCircle,
      content: scene.content.tips
    }
  ];

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Scenes
          </button>
          <h1 className="text-3xl font-bold mb-2">{scene.title}</h1>
          <p className="text-purple-100">{scene.description}</p>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${index <= currentStep ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400'}
                `}>
                  {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${index < currentStep ? 'bg-purple-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <div className="min-h-96">
            <div className="flex items-center gap-3 mb-6">
              <IconComponent className="w-8 h-8 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-800">{currentStepData.title}</h2>
            </div>
            
            <div className="text-gray-700 text-lg leading-relaxed">
              {currentStep === 1 || currentStep === 3 ? (
                <ul className="space-y-4">
                  {(currentStepData.content as string[]).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{currentStepData.content as string}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${currentStep === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={onStartQuiz}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
              >
                Start Quiz
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneView;