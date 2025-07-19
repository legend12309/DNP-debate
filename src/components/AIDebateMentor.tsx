import React, { useState } from 'react';
import { Bot, Send, Lightbulb, Target, BookOpen, X } from 'lucide-react';

interface AIDebateMentorProps {
  onClose: () => void;
  onComplete: () => void;
}

const AIDebateMentor: React.FC<AIDebateMentorProps> = ({ onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'bot' | 'user', message: string}>>([
    { type: 'bot', message: "Hello! I'm your AI Debate Mentor. I'm here to help you prepare for the final challenge. Let's practice some key skills!" }
  ]);

  const mentorSteps = [
    {
      id: 'rules',
      icon: BookOpen,
      title: 'Rebuttal Rules',
      botMessage: "Let me explain rebuttal rules: Always address the strongest opposing argument first, use evidence to support your counter-claim, and maintain respectful tone. What's the most important part of a good rebuttal?",
      correctKeywords: ['evidence', 'strongest', 'argument', 'counter'],
      response: "Excellent! Evidence-based rebuttals are indeed the strongest. You're ready for this!"
    },
    {
      id: 'structure',
      icon: Target,
      title: 'Argument Structure',
      botMessage: "A strong argument follows this structure: Claim → Evidence → Reasoning → Conclusion. Can you give me an example of a claim about school uniforms?",
      correctKeywords: ['school', 'uniforms', 'should', 'students', 'required'],
      response: "Great example! You understand how to make clear, specific claims."
    },
    {
      id: 'practice',
      icon: Lightbulb,
      title: 'Quick Practice',
      botMessage: "Here's a quick scenario: Someone argues 'Homework should be banned because it's stressful.' How would you rebut this?",
      correctKeywords: ['benefits', 'learning', 'practice', 'skills', 'preparation'],
      response: "Perfect! You're thinking like a skilled debater. You're ready for the final challenge!"
    }
  ];

  const currentStepData = mentorSteps[currentStep];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { type: 'user' as const, message: userInput },
    ];

    // Check if user response contains relevant keywords
    const hasRelevantContent = currentStepData.correctKeywords.some(keyword =>
      userInput.toLowerCase().includes(keyword.toLowerCase())
    );

    if (hasRelevantContent || userInput.length > 10) {
      newChatHistory.push({ type: 'bot', message: currentStepData.response });
      
      setTimeout(() => {
        if (currentStep < mentorSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
          setChatHistory(prev => [
            ...prev,
            { type: 'bot', message: mentorSteps[currentStep + 1].botMessage }
          ]);
        } else {
          setChatHistory(prev => [
            ...prev,
            { type: 'bot', message: "You're fully prepared! Good luck in the final challenge. Remember: stay confident, use evidence, and trust your instincts!" }
          ]);
          setTimeout(() => onComplete(), 2000);
        }
      }, 1500);
    } else {
      newChatHistory.push({ 
        type: 'bot', 
        message: "I'd love to hear more detail in your response. Can you elaborate on your thinking?" 
      });
    }

    setChatHistory(newChatHistory);
    setUserInput('');
  };

  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-6 z-50">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl shadow-2xl border-2 border-green-200 w-full max-w-2xl h-[600px] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">AI Debate Mentor</h2>
                <p className="text-green-100">Final Challenge Preparation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="p-4 border-b border-green-200">
          <div className="flex items-center justify-between">
            {mentorSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${index <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
                  `}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  {index < mentorSteps.length - 1 && (
                    <div className={`
                      w-16 h-1 mx-2
                      ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center mt-2">
            <span className="text-sm font-medium text-gray-600">{currentStepData.title}</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-xs lg:max-w-md px-4 py-3 rounded-2xl
                  ${message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                  }
                `}>
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-medium text-green-600">AI Mentor</span>
                    </div>
                  )}
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-green-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your response..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!userInput.trim()}
              className={`
                px-6 py-3 rounded-2xl font-medium transition-all duration-300
                ${userInput.trim()
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDebateMentor;