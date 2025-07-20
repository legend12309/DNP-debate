import React, { useState } from 'react';
import HeroSection from './HeroSection';
import ProgressBar from './ProgressBar';
import CharacterChoiceScreen from './CharacterChoiceScreen';
import RuleBreakingScene from './RuleBreakingScene';
import RebuttalSelector from './RebuttalSelector';
import FinalReviewScene from './FinalReviewScene';
import FallacyFightersLevel2 from './FallacyFightersLevel2';
import GrandPersuasionLevel3 from './GrandPersuasionLevel3';
import MentorOwl from './MentorOwl';
import AudienceMatchmakerScene from './AudienceMatchmakerScene';
import PersuasionMixerScene from './PersuasionMixerScene';
import { Trophy, Star, RotateCcw } from 'lucide-react';

const MinimalApp: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showHero, setShowHero] = useState(true);
  const [completedScenes, setCompletedScenes] = useState<Set<number>>(new Set());
  const [showLevel2, setShowLevel2] = useState(false);
  const [level2Completed, setLevel2Completed] = useState(false);
  const [showLevel3, setShowLevel3] = useState(false);
  const [level3Completed, setLevel3Completed] = useState(false);

  const scenes = [
    { title: 'Character Choice', component: CharacterChoiceScreen, id: 'character-choice' },
    { title: 'Rule Breaking', component: RuleBreakingScene, id: 'rule-breaking' },
    { title: 'Rebuttal Practice', component: RebuttalSelector, id: 'rebuttal' },
    { title: 'Final Review', component: FinalReviewScene, id: 'final-review' }
  ];

  const getCurrentLevel = () => {
    if (showLevel2) return 2;
    if (showLevel3) return 3;
    return 1;
  };

  const getCurrentScene = () => {
    if (showLevel2) return 'fallacy-fighters';
    if (showLevel3) return 'grand-persuasion';
    if (currentScene < scenes.length) return scenes[currentScene].id;
    return 'completed';
  };

  const handleNext = () => {
    setCompletedScenes(prev => new Set([...prev, currentScene]));
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
    } else {
      // All scenes completed
      setCurrentScene(scenes.length); // Show completion screen
    }
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setCompletedScenes(new Set());
  };

  const handleLevel2Complete = () => {
    setLevel2Completed(true);
    setShowLevel2(false);
  };

  const handleLevel3Complete = () => {
    setLevel3Completed(true);
    setShowLevel3(false);
    setShowHero(true); // Return to hero after completing everything
  };

  const handleStartQuest = () => {
    setShowHero(false);
    setCurrentScene(0);
  };

  const handleHowItWorks = () => {
    // Could show a tutorial or info modal
    alert('Tutorial coming soon! For now, click "Start Your Quest" to begin learning debate fundamentals.');
  };

  // Show Hero Section
  if (showHero) {
    return (
      <HeroSection 
        onStartQuest={handleStartQuest}
        onHowItWorks={handleHowItWorks}
      />
    );
  }

  // Show Level 2 if requested
  if (showLevel2) {
    return (
      <FallacyFightersLevel2
        onBack={() => setShowLevel2(false)}
        onComplete={handleLevel2Complete}
      />
    );
  }

  // Show Level 3 if requested
  if (showLevel3) {
    return (
      <GrandPersuasionLevel3
        onBack={() => setShowLevel3(false)}
        onComplete={handleLevel3Complete}
      />
    );
  }

  // Completion screen
  if (currentScene >= scenes.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Congratulations!</h1>
          <p className="text-xl text-gray-600 mb-8">
            You've completed all the debate fundamentals! You're now ready for advanced techniques.
          </p>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What You've Learned</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-800">Debate Roles</h3>
                <p className="text-sm text-gray-600">Character roles & responsibilities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-800">Rule Breaking</h3>
                <p className="text-sm text-gray-600">Spotting debate violations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-800">Rebuttal Practice</h3>
                <p className="text-sm text-gray-600">Choosing strong responses</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="font-semibold text-gray-800">Final Review</h3>
                <p className="text-sm text-gray-600">Judging debate quality</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              Practice Again
            </button>
            
            <button
              onClick={() => setShowLevel2(true)}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                ${level2Completed 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                }
              `}
            >
              <Star className="w-5 h-5" />
              {level2Completed ? 'Level 2 Complete!' : 'Start Level 2'}
            </button>
            
            {level2Completed && (
              <button
                onClick={() => setShowLevel3(true)}
                className={`
                  flex items-center gap-2 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                  ${level3Completed 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  }
                `}
              >
                <Trophy className="w-5 h-5" />
                {level3Completed ? 'Champion!' : 'Final Level'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const CurrentSceneComponent = scenes[currentScene].component;

  return (
    <div className="min-h-screen relative">
      <ProgressBar current={currentScene + 1} total={scenes.length} />
      <CurrentSceneComponent onNext={handleNext} />
      <MentorOwl 
        currentLevel={getCurrentLevel()}
        currentScene={getCurrentScene()}
        userProgress={{ completedScenes, currentScene }}
        onSuggestRetake={handleRestart}
      />
    </div>
  );
};

export default MinimalApp;