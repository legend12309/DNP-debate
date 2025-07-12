import React, { useState, useEffect } from 'react';
import { ArrowRight, Mic, Users, Heart, ThumbsUp, Brain, Download } from 'lucide-react';
import { SpeechPart, AudienceReaction } from '../types/GrandPersuasion';

interface GrandFinaleChallengeProps {
  speechParts: SpeechPart[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

const GrandFinaleChallenge: React.FC<GrandFinaleChallengeProps> = ({ speechParts, onComplete, onBack }) => {
  const [currentPart, setCurrentPart] = useState(0);
  const [speechContent, setSpeechContent] = useState<{ [key: string]: string }>({});
  const [isDelivering, setIsDelivering] = useState(false);
  const [audienceApproval, setAudienceApproval] = useState(50);
  const [reactions, setReactions] = useState<AudienceReaction[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const part = speechParts[currentPart];
  const allPartsComplete = Object.keys(speechContent).length === speechParts.length;

  const handleContentChange = (partId: string, content: string) => {
    setSpeechContent(prev => ({ ...prev, [partId]: content }));
  };

  const handleNext = () => {
    if (currentPart < speechParts.length - 1) {
      setCurrentPart(prev => prev + 1);
    } else if (allPartsComplete) {
      startDelivery();
    }
  };

  const startDelivery = () => {
    setIsDelivering(true);
    simulateAudienceReactions();
  };

  const simulateAudienceReactions = () => {
    const reactionSequence = [
      { type: 'thinking', intensity: 3, message: 'Audience is listening intently...' },
      { type: 'cheer', intensity: 4, message: 'Great opening! Audience is engaged!' },
      { type: 'applause', intensity: 5, message: 'Strong evidence! Approval rising!' },
      { type: 'heart', intensity: 5, message: 'Emotional connection made!' },
      { type: 'cheer', intensity: 5, message: 'Powerful conclusion! Standing ovation!' }
    ] as AudienceReaction[];

    reactionSequence.forEach((reaction, index) => {
      setTimeout(() => {
        setReactions(prev => [...prev, reaction]);
        setAudienceApproval(prev => Math.min(100, prev + reaction.intensity * 8));
        
        if (index === reactionSequence.length - 1) {
          setTimeout(() => setShowCompletion(true), 2000);
        }
      }, (index + 1) * 2000);
    });
  };

  const downloadCertificate = () => {
    // Create a simple certificate content
    const certificateContent = `
      🏆 DEBATE CHAMPION CERTIFICATE 🏆
      
      This certifies that the bearer has successfully completed
      
      DEBATE QUEST: THE GRAND PERSUASION
      
      Demonstrating mastery in:
      ✓ Logical Reasoning
      ✓ Emotional Appeals  
      ✓ Audience Adaptation
      ✓ Persuasive Communication
      
      Final Score: ${audienceApproval}%
      
      Congratulations on becoming a Debate Champion!
      
      Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'debate-champion-certificate.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-800 to-red-900 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <div className="text-6xl">🏆</div>
          </div>
          
          <h1 className="text-5xl font-bold text-yellow-100 mb-6">Debate Champion!</h1>
          <p className="text-2xl text-yellow-200 mb-8">
            You've mastered the art of persuasion!
          </p>
          
          <div className="bg-yellow-800/50 rounded-3xl shadow-2xl p-8 mb-8 border-2 border-yellow-600">
            <h2 className="text-3xl font-bold text-yellow-100 mb-6">🎖️ Champion Badge Earned!</h2>
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-5xl">👑</span>
            </div>
            <p className="text-yellow-200 text-lg mb-6">
              You've completed all three levels of Debate Quest and proven yourself as a master of persuasive communication!
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{audienceApproval}%</div>
                <div className="text-yellow-200">Audience Approval</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
                <div className="text-yellow-200">Course Complete</div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <button
              onClick={downloadCertificate}
              className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Download className="w-6 h-6" />
              Download Certificate
            </button>
            
            <button
              onClick={() => onComplete(audienceApproval)}
              className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-6 h-6" />
              Celebrate Victory
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isDelivering) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-green-100 mb-8">Delivering Your Speech</h1>
          
          {/* Audience Approval Meter */}
          <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-green-100">Audience Approval</h3>
            </div>
            
            <div className="w-full bg-green-700 rounded-full h-8 mb-4">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-8 rounded-full transition-all duration-1000 flex items-center justify-end pr-4"
                style={{ width: `${audienceApproval}%` }}
              >
                <span className="text-white font-bold">{audienceApproval}%</span>
              </div>
            </div>
          </div>

          {/* Live Reactions */}
          <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-100 mb-6">Live Audience Reactions</h3>
            <div className="space-y-4">
              {reactions.map((reaction, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border border-yellow-300 animate-fade-in"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {reaction.type === 'cheer' && '🎉'}
                      {reaction.type === 'heart' && '❤️'}
                      {reaction.type === 'applause' && '👏'}
                      {reaction.type === 'thinking' && '🤔'}
                      {reaction.type === 'confused' && '😕'}
                    </div>
                    <span className="text-yellow-800 font-medium">{reaction.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-green-200">
            <Mic className="w-8 h-8 animate-pulse" />
            <span className="text-xl">Speaking in progress...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-100 mb-4">The Grand Finale</h1>
          <p className="text-green-200 text-lg">Build your final persuasive speech</p>
        </div>

        {/* Progress */}
        <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-green-300">Speech Progress</span>
            <span className="text-green-300">{currentPart + 1}/{speechParts.length}</span>
          </div>
          <div className="w-full bg-green-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentPart + 1) / speechParts.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Speech Part */}
        <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${part.type === 'opening' ? 'bg-blue-500' : 
                part.type === 'evidence' ? 'bg-green-500' :
                part.type === 'emotion' ? 'bg-pink-500' : 'bg-orange-500'}
            `}>
              {part.type === 'opening' && <Mic className="w-6 h-6 text-white" />}
              {part.type === 'evidence' && <Brain className="w-6 h-6 text-white" />}
              {part.type === 'emotion' && <Heart className="w-6 h-6 text-white" />}
              {part.type === 'conclusion' && <ThumbsUp className="w-6 h-6 text-white" />}
            </div>
            <h3 className="text-2xl font-bold text-green-100">{part.title}</h3>
          </div>
          
          <textarea
            value={speechContent[part.id] || ''}
            onChange={(e) => handleContentChange(part.id, e.target.value)}
            placeholder={part.placeholder}
            className="w-full h-40 p-4 rounded-lg border-2 border-green-600 bg-green-700/50 text-green-100 placeholder-green-400 resize-none focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>

        {/* Preview of Complete Speech */}
        {Object.keys(speechContent).length > 0 && (
          <div className="bg-green-800 rounded-lg border-4 border-green-600 shadow-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-100 mb-6">Your Speech So Far</h3>
            <div className="space-y-4">
              {speechParts.map((speechPart) => (
                speechContent[speechPart.id] && (
                  <div key={speechPart.id} className="bg-green-700/50 rounded-lg p-4 border border-green-600">
                    <div className="text-green-300 text-sm font-medium mb-2">{speechPart.title}:</div>
                    <div className="text-green-100">{speechContent[speechPart.id]}</div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="bg-green-700 hover:bg-green-600 text-green-100 px-6 py-3 rounded-full transition-all duration-300"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!speechContent[part.id]?.trim()}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300
              ${speechContent[part.id]?.trim()
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-green-600 text-green-300 cursor-not-allowed'
              }
            `}
          >
            {currentPart < speechParts.length - 1 ? 'Next Part' : allPartsComplete ? 'Deliver Speech' : 'Complete This Part'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrandFinaleChallenge;