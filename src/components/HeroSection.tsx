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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 relative overflow-hidden">
      {/* Chalkboard texture overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-cyan-400/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent_50%)]"></div>
        {/* Neon glow effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating digital particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full opacity-40 animate-float shadow-lg shadow-green-400/50"
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
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30 shadow-lg shadow-green-400/20">
              <Play className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-300">Learn by Playing</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/30 shadow-lg shadow-yellow-400/20">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-300">Earn XP & Badges</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30 shadow-lg shadow-cyan-400/20">
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Retake & Improve</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-100 mb-6 leading-tight">
            Master the Art of{' '}
            <span className="text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text animate-pulse">
              Argument
            </span>
            {' '}— One Level at a Time
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
            Debate Quest is a story-driven journey to help you become a{' '}
            <span className="text-green-400 font-semibold">confident speaker</span>,{' '}
            <span className="text-cyan-400 font-semibold">logical thinker</span>, and{' '}
            <span className="text-blue-400 font-semibold">persuasive voice</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onStartQuest}
              className="group bg-gradient-to-r from-green-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-400/30 hover:shadow-2xl hover:shadow-green-400/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 animate-bounce"
            >
              <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Start Your Quest
            </button>
            
            <button
              onClick={onHowItWorks}
              className="bg-slate-800/50 backdrop-blur-sm text-slate-200 border-2 border-slate-600/50 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-700/50 hover:border-green-400/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <HelpCircle className="w-5 h-5" />
              How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30 shadow-lg shadow-green-400/10">
              <div className="text-2xl font-bold text-green-400">4</div>
              <div className="text-sm text-slate-300">Core Skills</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-cyan-400/30 shadow-lg shadow-cyan-400/10">
              <div className="text-2xl font-bold text-cyan-400">3</div>
              <div className="text-sm text-slate-300">Levels</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30 shadow-lg shadow-blue-400/10">
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <div className="text-sm text-slate-300">Practice</div>
            </div>
          </div>
        </div>

        {/* Right Content - Characters */}
        <div className={`lg:w-1/2 mt-12 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="relative">
            {/* Main character circle */}
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Character avatars positioned around the circle */}
              <div className="relative w-full h-full">
                {/* Debater */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-blue-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-blue-400/50 animate-float border-2 border-blue-300/50">
                  <Users className="w-10 h-10 text-white" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm text-blue-300 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border border-blue-400/30">
                    Debater
                  </div>
                </div>

                {/* Mentor Bot */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-br from-purple-400 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-purple-400/50 animate-float border-2 border-purple-300/50" style={{ animationDelay: '1s' }}>
                  <Bot className="w-10 h-10 text-white" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border border-purple-400/30">
                    Mentor
                  </div>
                </div>

                {/* Moderator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-green-400 to-green-500 w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-green-400/50 animate-float border-2 border-green-300/50" style={{ animationDelay: '2s' }}>
                  <Gavel className="w-10 h-10 text-white" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm text-green-300 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border border-green-400/30">
                    Moderator
                  </div>
                </div>

                {/* Central logo/icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-green-400 to-cyan-400 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl shadow-green-400/50 border-4 border-green-300/30">
                  <div className="text-4xl animate-pulse">🎯</div>
                  {/* XP Progress Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-400 to-orange-400 opacity-30 animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-8 right-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-3 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-yellow-400/50 animate-bounce border border-yellow-300/50" style={{ animationDelay: '0.5s' }}>
              +10 XP
            </div>
            <div className="absolute bottom-8 left-8 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-pink-400/50 animate-bounce border border-pink-300/50" style={{ animationDelay: '1.5s' }}>
              🏆 Badge
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default HeroSection;