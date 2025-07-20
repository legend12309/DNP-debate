import React, { useState, useEffect } from 'react';
import { Play, HelpCircle, Trophy, Zap, RotateCcw, Users, Bot, Gavel, Star, Target, BookOpen, Award } from 'lucide-react';

interface HeroSectionProps {
  onStartQuest: () => void;
  onHowItWorks: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartQuest, onHowItWorks }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "I went from shy to confident speaker!", author: "Sarah, 16", rating: 5 },
    { text: "Finally understand how debates work!", author: "Marcus, 15", rating: 5 },
    { text: "Made learning debate actually fun!", author: "Emma, 17", rating: 5 }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Achievement Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { icon: Trophy, color: 'text-yellow-400', position: 'top-1/4 left-1/6' },
          { icon: Star, color: 'text-blue-400', position: 'top-1/3 right-1/5' },
          { icon: Target, color: 'text-pink-400', position: 'bottom-1/3 left-1/8' },
          { icon: Award, color: 'text-purple-400', position: 'bottom-1/4 right-1/6' }
        ].map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} animate-float opacity-30`}
            style={{ animationDelay: `${index * 0.5}s`, animationDuration: '4s' }}
          >
            <item.icon className={`w-8 h-8 ${item.color}`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Top Navigation Bar */}
        <div className={`flex justify-between items-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">🎯</span>
            </div>
            <span className="text-xl font-bold text-cream-50">Debate Quest</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-green-200">
            <span className="hover:text-cream-50 cursor-pointer transition-colors">Features</span>
            <span className="hover:text-cream-50 cursor-pointer transition-colors">Levels</span>
            <span className="hover:text-cream-50 cursor-pointer transition-colors">Progress</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Problem Statement */}
            <div className="bg-red-100/10 backdrop-blur-sm border border-red-300/20 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <span className="text-sm font-medium">78% of students fear public speaking more than death</span>
              </div>
            </div>

            {/* Main Value Proposition */}
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold text-cream-50 mb-6 leading-tight">
                Turn Fear Into
                <span className="block text-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text animate-pulse">
                  Fearless
                </span>
                <span className="block">Debating</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-green-100 mb-8 leading-relaxed">
                Master debate fundamentals through 
                <span className="text-yellow-200 font-semibold"> interactive stories</span>, 
                <span className="text-blue-200 font-semibold"> gamified challenges</span>, and 
                <span className="text-pink-200 font-semibold"> AI mentorship</span>.
              </p>
            </div>

            {/* Social Proof */}
            <div className="bg-green-800/30 backdrop-blur-sm rounded-2xl p-6 border border-green-600/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{String.fromCharCode(64 + i)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-green-200 text-sm">Join 10,000+ students building confidence</p>
                </div>
              </div>
              
              <div className="transition-all duration-500">
                <p className="text-green-100 italic mb-2">"{testimonials[currentTestimonial].text}"</p>
                <p className="text-green-300 text-sm">— {testimonials[currentTestimonial].author}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartQuest}
                className="group bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Start Your Debate Journey
                <div className="bg-white/20 px-2 py-1 rounded-lg text-sm">FREE</div>
              </button>
              
              <button
                onClick={onHowItWorks}
                className="bg-cream-50/10 backdrop-blur-sm text-cream-50 border-2 border-cream-50/30 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-cream-50/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <HelpCircle className="w-5 h-5" />
                See How It Works
              </button>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Play, text: "Interactive Stories", color: "from-blue-400 to-blue-500" },
                { icon: Trophy, text: "Earn XP & Badges", color: "from-yellow-400 to-orange-500" },
                { icon: RotateCcw, text: "Practice Unlimited", color: "from-green-400 to-green-500" },
                { icon: Bot, text: "AI Mentor Guide", color: "from-purple-400 to-pink-500" }
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 bg-gradient-to-r ${badge.color} bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg text-white text-sm font-medium`}
                >
                  <badge.icon className="w-4 h-4" />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Main Demo Container */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-pink-400/20 rounded-3xl blur-3xl"></div>
              
              {/* Demo Screen */}
              <div className="relative bg-green-800/40 backdrop-blur-xl rounded-3xl border border-green-600/30 p-8 shadow-2xl">
                {/* Demo Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-green-100 font-semibold">Level 1: The Basics</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-bold">+100 XP</span>
                  </div>
                </div>

                {/* Character Selection Demo */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-green-100 font-bold text-lg">Choose Your Role:</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Users, name: "Debater", color: "from-blue-400 to-blue-500" },
                      { icon: Bot, name: "Mentor", color: "from-purple-400 to-purple-500" },
                      { icon: Gavel, name: "Judge", color: "from-green-400 to-green-500" }
                    ].map((character, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-br ${character.color} p-4 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform`}
                      >
                        <character.icon className="w-8 h-8 text-white mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">{character.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="bg-green-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-200 text-sm">Progress</span>
                    <span className="text-green-200 text-sm">1/4 Complete</span>
                  </div>
                  <div className="w-full bg-green-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-1/4 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Notifications */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl shadow-lg animate-bounce">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-bold">Badge Earned!</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-blue-400 text-blue-900 px-4 py-2 rounded-xl shadow-lg animate-pulse">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-bold">Level Up!</span>
                </div>
              </div>
            </div>

            {/* Learning Path Preview */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { level: "1", title: "Basics", status: "active", color: "from-green-400 to-green-500" },
                { level: "2", title: "Logic", status: "locked", color: "from-blue-400 to-blue-500" },
                { level: "3", title: "Master", status: "locked", color: "from-purple-400 to-purple-500" }
              ].map((level, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${level.color} ${level.status === 'locked' ? 'opacity-50' : ''} p-4 rounded-xl text-center`}
                >
                  <div className="text-white font-bold text-lg mb-1">Level {level.level}</div>
                  <div className="text-white/90 text-sm">{level.title}</div>
                  {level.status === 'active' && (
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mt-2 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { number: "10K+", label: "Active Learners", icon: Users },
            { number: "95%", label: "Confidence Boost", icon: Trophy },
            { number: "3", label: "Skill Levels", icon: Target },
            { number: "24/7", label: "AI Mentorship", icon: Bot }
          ].map((stat, index) => (
            <div key={index} className="bg-green-800/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-green-600/30">
              <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-cream-50 mb-1">{stat.number}</div>
              <div className="text-green-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;