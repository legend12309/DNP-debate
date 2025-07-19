import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

interface AIInsightPanelProps {
  levelName: string;
  playerResponses: any[];
  xpEarned: number;
  onContinue: () => void;
}

const AIInsightPanel: React.FC<AIInsightPanelProps> = ({
  levelName,
  playerResponses,
  xpEarned,
  onContinue
}) => {
  const [insight, setInsight] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const generateInsight = () => {
    const insights = {
      'Character Choice': [
        "You showed great attention to detail in understanding debate roles — this foundation will serve you well!",
        "Your careful consideration of each character's responsibilities demonstrates strong analytical thinking."
      ],
      'Rule Breaking': [
        "You caught most rule violations quickly — your eye for detail is developing nicely!",
        "Great work identifying debate infractions — this skill will help you stay fair and focused."
      ],
      'Rebuttal Practice': [
        "Your rebuttal choices show you understand the importance of evidence-based responses!",
        "You're learning to counter arguments effectively — try to be even more specific with your evidence."
      ],
      'Final Review': [
        "You demonstrated good judgment in evaluating debate quality — keep refining your critical eye!",
        "Your scoring shows you understand what makes arguments strong — excellent progress!"
      ]
    };

    const levelInsights = insights[levelName as keyof typeof insights] || [
      "You're making excellent progress in your debate journey — keep up the great work!"
    ];
    
    return levelInsights[Math.floor(Math.random() * levelInsights.length)];
  };

  useEffect(() => {
    const generatedInsight = generateInsight();
    setInsight('');
    setIsTyping(true);

    // Simulate typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < generatedInsight.length) {
        setInsight(generatedInsight.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [levelName]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-6 z-50">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl border-2 border-blue-200 p-8 max-w-2xl w-full animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Insight</h2>
          <p className="text-gray-600">Personalized feedback on your performance</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">{levelName} Analysis</h3>
          </div>
          
          <div className="text-gray-700 text-lg leading-relaxed min-h-16">
            {insight}
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-gray-800">XP Earned</span>
            </div>
            <span className="text-2xl font-bold text-green-600">+{xpEarned}</span>
          </div>
        </div>

        <button
          onClick={onContinue}
          disabled={isTyping}
          className={`
            w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold transition-all duration-300
            ${isTyping
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
            }
          `}
        >
          Continue Your Journey
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AIInsightPanel;