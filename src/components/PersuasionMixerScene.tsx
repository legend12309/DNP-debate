import React, { useState } from 'react';
import { ArrowRight, Trophy, Star, Zap, Lock, Heart, Brain, Sparkles, RotateCcw } from 'lucide-react';

interface PersuasionMixerSceneProps {
  onNext: () => void;
}

interface Block {
  id: string;
  text: string;
  type: 'emotion' | 'logic';
  category: string;
}

const emotionBlocks: Block[] = [
  { id: 'e1', text: 'We care deeply about', type: 'emotion', category: 'caring' },
  { id: 'e2', text: 'Our future is at stake', type: 'emotion', category: 'urgency' },
  { id: 'e3', text: 'Imagine the relief when', type: 'emotion', category: 'visualization' },
  { id: 'e4', text: 'Every child deserves', type: 'emotion', category: 'values' },
  { id: 'e5', text: 'Picture the pride of', type: 'emotion', category: 'aspiration' },
  { id: 'e6', text: 'We cannot ignore the pain of', type: 'emotion', category: 'empathy' }
];

const logicBlocks: Block[] = [
  { id: 'l1', text: 'studies show that', type: 'logic', category: 'research' },
  { id: 'l2', text: 'according to data from', type: 'logic', category: 'statistics' },
  { id: 'l3', text: 'experts confirm that', type: 'logic', category: 'authority' },
  { id: 'l4', text: 'evidence demonstrates', type: 'logic', category: 'proof' },
  { id: 'l5', text: 'research indicates that', type: 'logic', category: 'findings' },
  { id: 'l6', text: 'analysis reveals that', type: 'logic', category: 'investigation' }
];

const PersuasionMixerScene: React.FC<PersuasionMixerSceneProps> = ({ onNext }) => {
  const [selectedBlocks, setSelectedBlocks] = useState<Block[]>([]);
  const [constructedSentences, setConstructedSentences] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [showRetakeOption, setShowRetakeOption] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);

  const requiredXP = 30;
  const maxSentences = 4;
  const canProceed = xp >= requiredXP;

  const handleRetake = () => {
    setSelectedBlocks([]);
    setConstructedSentences([]);
    setXp(0);
    setShowFeedback(null);
    setSentenceCount(0);
    setShowRetakeOption(false);
    setShakeAnimation(false);
  };

  const handleProceedAttempt = () => {
    if (!canProceed) {
      setShowRetakeOption(true);
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 600);
    } else {
      onNext();
    }
  };

  const handleBlockSelect = (block: Block) => {
    if (selectedBlocks.length < 3 && !selectedBlocks.find(b => b.id === block.id)) {
      setSelectedBlocks(prev => [...prev, block]);
    }
  };

  const handleBlockRemove = (blockId: string) => {
    setSelectedBlocks(prev => prev.filter(b => b.id !== blockId));
  };

  const handleConstruct = () => {
    if (selectedBlocks.length < 2) return;

    const emotionCount = selectedBlocks.filter(b => b.type === 'emotion').length;
    const logicCount = selectedBlocks.filter(b => b.type === 'logic').length;
    
    let xpGain = 0;
    let feedbackMessage = '';

    if (emotionCount >= 1 && logicCount >= 1) {
      // Perfect balance
      xpGain = 15;
      feedbackMessage = '✅ Perfect Balance! Emotion + Logic = Powerful Persuasion! +15 XP';
    } else if (emotionCount > 0 || logicCount > 0) {
      // Partial credit
      xpGain = 5;
      feedbackMessage = emotionCount > logicCount 
        ? '⚠️ Too emotional! Add some logic for better balance. +5 XP'
        : '⚠️ Too logical! Add some emotion to connect with hearts. +5 XP';
    } else {
      xpGain = 0;
      feedbackMessage = '❌ No persuasive elements detected. Try again!';
    }

    // Construct the sentence
    const sentence = selectedBlocks.map(block => block.text).join(' ') + '.';
    setConstructedSentences(prev => [...prev, sentence]);
    
    setXp(prev => prev + xpGain);
    setShowFeedback(feedbackMessage);
    setSentenceCount(prev => prev + 1);
    
    // Clear selection
    setSelectedBlocks([]);
    
    // Hide feedback after 3 seconds
    setTimeout(() => setShowFeedback(null), 3000);
  };

  const handleReset = () => {
    setSelectedBlocks([]);
  };

  const canConstruct = selectedBlocks.length >= 2;
  const hasMoreAttempts = sentenceCount < maxSentences;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-800 px-6 py-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header with XP Tracker */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-50" style={{ fontFamily: 'Caveat, cursive' }}>
            🧩 Persuasion Mixer
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
            <div className={`w-32 bg-green-700/50 rounded-full h-3 overflow-hidden ${canProceed ? 'shadow-lg shadow-yellow-400/50' : ''}`}>
              <div 
                className={`bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-700 ease-out ${canProceed ? 'animate-pulse' : ''}`}
                style={{ width: `${Math.min((xp / requiredXP) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Retake Option */}
        {showRetakeOption && !canProceed && sentenceCount >= maxSentences && (
          <div className="bg-red-100/20 border-2 border-red-300/50 rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-red-200 mb-2">You haven't earned enough XP to continue.</h3>
              <p className="text-red-300 mb-6 italic">"Give it another shot — debate mastery takes practice!"</p>
              <button
                onClick={handleRetake}
                className="bg-gradient-to-r from-red-300 to-red-400 text-red-900 px-8 py-3 rounded-full font-semibold hover:from-red-400 hover:to-red-500 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                🔁 Retake Challenge
              </button>
            </div>
          </div>
        )}

        {/* Topic Card */}
        <div className={`bg-green-600/20 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-400/30 p-8 mb-8 text-center ${shakeAnimation ? 'animate-pulse' : ''}`}>
          <h2 className="text-2xl font-bold text-green-50 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
            🎯 Topic: School Start Times
          </h2>
          <p className="text-green-200 text-lg">
            Drag blocks to create persuasive sentences that balance emotion and logic
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Emotion Blocks */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-pink-400" />
              <h3 className="text-2xl font-bold text-green-50" style={{ fontFamily: 'Caveat, cursive' }}>
                💖 Emotion Blocks
              </h3>
            </div>
            <div className="space-y-3">
              {emotionBlocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleBlockSelect(block)}
                  disabled={selectedBlocks.find(b => b.id === block.id) !== undefined}
                  className={`
                    w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left transform
                    ${selectedBlocks.find(b => b.id === block.id)
                      ? 'border-pink-400 bg-pink-400/20 text-pink-100 opacity-50 cursor-not-allowed'
                      : 'border-pink-400/50 bg-pink-400/10 text-pink-100 hover:bg-pink-400/20 hover:scale-102 cursor-pointer shadow-lg'
                    }
                  `}
                  style={{ 
                    boxShadow: selectedBlocks.find(b => b.id === block.id) ? 'none' : '0 0 20px rgba(244, 114, 182, 0.3)' 
                  }}
                >
                  <div className="font-medium">{block.text}</div>
                  <div className="text-sm text-pink-300 capitalize mt-1">{block.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Logic Blocks */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-green-50" style={{ fontFamily: 'Caveat, cursive' }}>
                🧠 Logic Blocks
              </h3>
            </div>
            <div className="space-y-3">
              {logicBlocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleBlockSelect(block)}
                  disabled={selectedBlocks.find(b => b.id === block.id) !== undefined}
                  className={`
                    w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left transform
                    ${selectedBlocks.find(b => b.id === block.id)
                      ? 'border-blue-400 bg-blue-400/20 text-blue-100 opacity-50 cursor-not-allowed'
                      : 'border-blue-400/50 bg-blue-400/10 text-blue-100 hover:bg-blue-400/20 hover:scale-102 cursor-pointer shadow-lg'
                    }
                  `}
                  style={{ 
                    boxShadow: selectedBlocks.find(b => b.id === block.id) ? 'none' : '0 0 20px rgba(96, 165, 250, 0.3)' 
                  }}
                >
                  <div className="font-medium">{block.text}</div>
                  <div className="text-sm text-blue-300 capitalize mt-1">{block.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Construction Area */}
        <div className="bg-green-600/20 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-400/30 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-bold text-green-50" style={{ fontFamily: 'Caveat, cursive' }}>
              ✨ Sentence Constructor
            </h3>
          </div>

          {/* Selected Blocks Display */}
          <div className="bg-amber-100/10 border-2 border-dashed border-amber-300/50 rounded-2xl p-6 mb-6 min-h-24">
            {selectedBlocks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {selectedBlocks.map((block, index) => (
                  <div
                    key={block.id}
                    onClick={() => handleBlockRemove(block.id)}
                    className={`
                      px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105
                      ${block.type === 'emotion' 
                        ? 'bg-pink-400/30 border-pink-400 text-pink-100' 
                        : 'bg-blue-400/30 border-blue-400 text-blue-100'
                      }
                    `}
                  >
                    {block.text}
                    {index < selectedBlocks.length - 1 && <span className="ml-2 text-yellow-300">+</span>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-green-300 italic">
                Select 2-3 blocks to construct your persuasive sentence
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleConstruct}
              disabled={!canConstruct || !hasMoreAttempts}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300
                ${canConstruct && hasMoreAttempts
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 hover:scale-105 shadow-xl'
                  : 'bg-green-600/30 text-green-400 cursor-not-allowed'
                }
              `}
            >
              <Sparkles className="w-6 h-6" />
              Construct Sentence
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-green-600/30 text-green-200 px-6 py-4 rounded-full hover:bg-green-600/50 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          <div className="text-center text-green-300 text-sm mt-4">
            Attempts: {sentenceCount}/{maxSentences}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-yellow-100/20 border-2 border-yellow-300/50 rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="text-center">
              <div className="text-2xl mb-2">{showFeedback.includes('✅') ? '🎉' : showFeedback.includes('⚠️') ? '💡' : '❌'}</div>
              <p className="text-yellow-100 font-semibold text-lg">{showFeedback}</p>
            </div>
          </div>
        )}

        {/* Constructed Sentences */}
        {constructedSentences.length > 0 && (
          <div className="bg-green-600/20 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-400/30 p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-50 mb-6" style={{ fontFamily: 'Caveat, cursive' }}>
              📝 Your Persuasive Arsenal
            </h3>
            <div className="space-y-4">
              {constructedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="bg-amber-100/20 border border-amber-300/50 rounded-2xl p-4 animate-fade-in"
                >
                  <div className="text-amber-100 font-medium">
                    {index + 1}. {sentence}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proceed Button */}
        <div className="text-center">
          <button
            onClick={handleProceedAttempt}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 mx-auto
              ${canProceed
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 hover:scale-105 shadow-xl shadow-yellow-400/30'
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
        {canProceed && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-yellow-400 animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-100 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                Master Persuader! 🎉
              </h3>
              <p className="text-green-100">You've unlocked the next challenge. Get ready!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersuasionMixerScene;