import React from 'react';
import { ArrowLeft, Star, Lock, BookOpen } from 'lucide-react';

interface Module2ViewProps {
  onBack: () => void;
}

const Module2View: React.FC<Module2ViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold mb-2">Module 2: Advanced Techniques</h1>
              <p className="text-yellow-100">Master advanced debate strategies</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Module 2 will include advanced debate techniques, strategic planning, 
              cross-examination skills, and advanced argument construction. 
              Stay tuned for these exciting new challenges!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Advanced Argumentation',
                description: 'Learn complex argument structures and logical frameworks',
                icon: '🎯'
              },
              {
                title: 'Cross-Examination',
                description: 'Master the art of questioning and challenging opponents',
                icon: '❓'
              },
              {
                title: 'Strategic Planning',
                description: 'Develop comprehensive debate strategies and tactics',
                icon: '🧩'
              },
              {
                title: 'Advanced Rebuttals',
                description: 'Create sophisticated responses to complex arguments',
                icon: '⚡'
              }
            ].map((topic, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 opacity-75">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{topic.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{topic.title}</h3>
                    <p className="text-gray-600">{topic.description}</p>
                  </div>
                  <Lock className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              🎉 Congratulations on completing Module 1!
            </h3>
            <p className="text-gray-700">
              You've mastered the fundamentals of debate. Module 2 will challenge you with 
              advanced techniques that will elevate your debating skills to the next level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module2View;