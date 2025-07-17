import React, { useState, useEffect } from 'react';
import { Play, HelpCircle, Trophy, Zap, RotateCcw, Users, Bot, Gavel } from 'lucide-react';

interface HeroSectionProps {
  onStartQuest: () => void;
  onHowItWorks: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartQuest, onHowItWorks }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 relative overflow-hidden">
      {/* Chalkboard texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating chalk dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cream-100 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center min-h-screen">
        {/* Left Content */}
        <div className={`lg:w-1/2 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge Strip */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
            <div className="flex items-center gap-2 bg-cream-50/90 backdrop-blur-sm px-4 py-2 rounded-full border border-cream-200 shadow-lg">
              <Play className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Learn by Playing</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50/90 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-200 shadow-lg">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Earn XP & Badges</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50/90 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 shadow-lg">
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Retake & Improve</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-cream-50 mb-6 leading-tight font-['Caveat']">
            Master the Art of{' '}
            <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
              Debate
            </span>
            , One Level at a Time
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-green-100 mb-8 leading-relaxed font-['Poppins']">
            An interactive journey to unlock{' '}
            <span className="text-yellow-200 font-semibold">confidence</span>,{' '}
            <span className="text-blue-200 font-semibold">logic</span>, and{' '}
            <span className="text-pink-200 font-semibold">voice</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onStartQuest}
              className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 animate-bounce"
            >
              <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Start Your Quest
            </button>
            
            <button
              onClick={onHowItWorks}
              className="bg-cream-50/20 backdrop-blur-sm text-cream-50 border-2 border-cream-50/30 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-cream-50/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <HelpCircle className="w-5 h-5" />
              How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="bg-green-800/50 backdrop-blur-sm rounded-2xl p-4 border border-green-600/30">
              <div className="text-2xl font-bold text-yellow-300">4</div>
              <div className="text-sm text-green-200">Core Skills</div>
            </div>
            <div className="bg-green-800/50 backdrop-blur-sm rounded-2xl p-4 border border-green-600/30">
              <div className="text-2xl font-bold text-blue-300">3</div>
              <div className="text-sm text-green-200">Levels</div>
            </div>
            <div className="bg-green-800/50 backdrop-blur-sm rounded-2xl p-4 border border-green-600/30">
              <div className="text-2xl font-bold text-pink-300">∞</div>
              <div className="text-sm text-green-200">Practice</div>
            </div>
          </div>
        </div>

        {/* Right Content - Characters */}
        <div className={`lg:w-1/2 mt-12 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="relative">
            {/* Main character circle */}
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
              
              {/* Character avatars positioned around the circle */}
              <div className="relative w-full h-full">
                {/* Debater */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-blue-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center shadow-xl animate-float">
                  <Users className="w-10 h-10 text-white" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    Debater
                  </div>
                </div>

                {/* Mentor Bot */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-br from-purple-400 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <Bot className="w-10 h-10 text-white" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    Mentor
                  </div>
                </div>

                {/* Moderator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-green-400 to-green-500 w-20 h-20 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                  <Gavel className="w-10 h-10 text-white" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    Moderator
                  </div>
                </div>

                {/* Central logo/icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-yellow-400 to-orange-400 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-4xl font-bold text-green-900">🎯</div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-8 right-8 bg-yellow-200 text-yellow-800 px-3 py-2 rounded-lg text-sm font-semibold shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
              +10 XP
            </div>
            <div className="absolute bottom-8 left-8 bg-pink-200 text-pink-800 px-3 py-2 rounded-lg text-sm font-semibold shadow-lg animate-bounce" style={{ animationDelay: '1.5s' }}>
              🏆 Badge
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900 to-transparent"></div>
    </div>
  );
};

export default HeroSection;