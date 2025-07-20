import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Lightbulb, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MentorOwlProps {
  currentLevel: number;
  currentScene: string;
  userProgress: any;
  onSuggestRetake?: () => void;
}

const MentorOwl: React.FC<MentorOwlProps> = ({ 
  currentLevel, 
  currentScene, 
  userProgress,
  onSuggestRetake 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message based on current context
      const welcomeMessage = getContextualWelcome();
      addMessage(welcomeMessage, false);
    }
  }, [isOpen, currentLevel, currentScene]);

  const getContextualWelcome = () => {
    if (currentLevel === 1) {
      switch (currentScene) {
        case 'character-choice':
          return "🦉 Welcome! I'm Mentor Owl. Ready to learn about debate roles? Ask me anything about the characters you see!";
        case 'rule-breaking':
          return "🦉 Sharp eyes! I'm here to help you spot those rule violations. What seems tricky about this debate scene?";
        case 'rebuttal':
          return "🦉 Rebuttals can be challenging! I'm here to guide you toward stronger responses. What's your thinking process?";
        case 'final-review':
          return "🦉 Time to judge! I can help you evaluate what makes a debate strong. What criteria are you considering?";
        default:
          return "🦉 Hello! I'm Mentor Owl, your debate coach. I'm here to guide you through the fundamentals. What would you like to explore?";
      }
    } else if (currentLevel === 2) {
      return "🦉 Level 2 - excellent progress! I'm here to help you master logical reasoning and spot those tricky fallacies. What's on your mind?";
    } else if (currentLevel === 3) {
      return "🦉 Welcome to the final challenge! I'll help you craft persuasive arguments that move hearts and minds. Ready to become a debate champion?";
    }
    return "🦉 Hello! I'm Mentor Owl, your wise debate mentor. How can I guide your learning journey today?";
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const response = getMentorResponse(userMessage.toLowerCase());
    addMessage(response, false);
    setIsTyping(false);
  };

  const getMentorResponse = (userMessage: string) => {
    // Context-aware responses based on current level and scene
    if (currentLevel === 1) {
      if (currentScene === 'character-choice') {
        if (userMessage.includes('moderator') || userMessage.includes('judge')) {
          return "🦉 Great question! The moderator keeps debates fair and organized. What do you think happens when there's no moderator? Try thinking about sports without referees!";
        }
        if (userMessage.includes('affirmative') || userMessage.includes('for')) {
          return "🦉 The affirmative speaker argues FOR the topic. Think of them as the 'yes' team. What advantages might they have in going first?";
        }
        if (userMessage.includes('negative') || userMessage.includes('against')) {
          return "🦉 The negative speaker argues AGAINST the topic. They get to respond to the affirmative's points. What's the strategic advantage of going second?";
        }
      }
      
      if (currentScene === 'rule-breaking') {
        if (userMessage.includes('time') || userMessage.includes('limit')) {
          return "🦉 Time limits keep debates fair! What happens in sports when someone takes too long? Look for the timer in the scene - is it showing something unusual?";
        }
        if (userMessage.includes('interrupt') || userMessage.includes('talking')) {
          return "🦉 Good eye! Interrupting breaks the flow of debate. Watch the speakers - is someone trying to talk over their opponent?";
        }
        if (userMessage.includes('attack') || userMessage.includes('personal')) {
          return "🦉 Personal attacks hurt the debate's quality. We attack ideas, not people! Can you spot where someone might be attacking the person instead of their argument?";
        }
      }
      
      if (currentScene === 'rebuttal') {
        if (userMessage.includes('evidence') || userMessage.includes('facts')) {
          return "🦉 Evidence is powerful! When someone makes a claim, what kind of proof would make you believe them? Look for responses that use data or studies.";
        }
        if (userMessage.includes('weak') || userMessage.includes('bad')) {
          return "🦉 What makes a rebuttal weak? Think about responses that don't address the actual argument or just say 'you're wrong' without explanation.";
        }
        if (userMessage.includes('strong') || userMessage.includes('good')) {
          return "🦉 Strong rebuttals do three things: address the opponent's point, provide counter-evidence, and explain why their view is better. Which option does this best?";
        }
      }
    }
    
    if (currentLevel === 2) {
      if (userMessage.includes('fallacy') || userMessage.includes('logical')) {
        return "🦉 Fallacies are tricks our brains play on us! They seem logical but have hidden flaws. What pattern do you notice in the argument that seems 'off'?";
      }
      if (userMessage.includes('evidence') || userMessage.includes('source')) {
        return "🦉 Good evidence has three qualities: it's recent, from experts, and directly supports the claim. Which of these might be missing?";
      }
      if (userMessage.includes('structure') || userMessage.includes('order')) {
        return "🦉 Think of arguments like building a house: foundation (claim), walls (evidence), roof (conclusion). What comes first in a strong argument?";
      }
    }
    
    if (currentLevel === 3) {
      if (userMessage.includes('emotion') || userMessage.includes('heart')) {
        return "🦉 Emotions move people to action! But they need logic to be convincing. How can you make people FEEL something while also making them THINK?";
      }
      if (userMessage.includes('audience') || userMessage.includes('tone')) {
        return "🦉 Different audiences need different approaches. Would you talk to your friends the same way you'd talk to your principal? What tone fits this audience?";
      }
      if (userMessage.includes('persuasive') || userMessage.includes('convince')) {
        return "🦉 The best persuasion combines head and heart. You need facts people can trust AND feelings they can connect with. What's your balance?";
      }
    }
    
    // General helpful responses
    if (userMessage.includes('hint') || userMessage.includes('help')) {
      return "🦉 Instead of giving you the answer, let me ask: What's your first instinct? Trust that feeling, then think about why you chose it. What evidence supports your choice?";
    }
    
    if (userMessage.includes('wrong') || userMessage.includes('incorrect')) {
      return "🦉 Mistakes are learning opportunities! What made that choice seem right at first? Understanding your thinking helps you improve. Want to try a different approach?";
    }
    
    if (userMessage.includes('stuck') || userMessage.includes('confused')) {
      return "🦉 When you're stuck, step back and ask: What is the main goal here? What would a strong debater do? Sometimes the simplest answer is the best one.";
    }
    
    if (userMessage.includes('retake') || userMessage.includes('again')) {
      return "🦉 Practice makes perfect! Each attempt teaches you something new. What will you do differently this time? Focus on one skill at a time.";
    }
    
    // Default encouraging response
    const encouragingResponses = [
      "🦉 That's a thoughtful question! What's your reasoning behind it? I'd love to hear your thinking process.",
      "🦉 Interesting perspective! What evidence or examples support that idea? Let's explore it together.",
      "🦉 Good question! Instead of telling you the answer, what clues can you find in the current challenge?",
      "🦉 I can see you're thinking deeply! What patterns do you notice? Trust your analytical skills.",
      "🦉 Great curiosity! What would happen if you tried the opposite approach? Sometimes that reveals the answer."
    ];
    
    return encouragingResponses[Math.floor(Math.random() * encouragingResponses.length)];
  };

  const handleSend = () => {
    if (inputText.trim()) {
      addMessage(inputText, true);
      generateResponse(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { icon: HelpCircle, text: "Give me a hint", action: () => addMessage("Give me a hint", true) },
    { icon: Lightbulb, text: "Explain this concept", action: () => addMessage("Explain this concept", true) },
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 
          text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 
          transition-all duration-300 z-50 flex items-center justify-center
          ${isOpen ? 'scale-0' : 'scale-100'}
        `}
      >
        <div className="relative">
          <MessageCircle className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div className="w-full max-w-md h-96 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🦉</span>
                </div>
                <div>
                  <h3 className="font-bold">Mentor Owl</h3>
                  <p className="text-xs text-green-100">Your Debate Coach</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-xs px-4 py-2 rounded-2xl text-sm
                      ${message.isUser
                        ? 'bg-green-500 text-white rounded-br-md'
                        : 'bg-green-100 text-green-800 rounded-bl-md'
                      }
                    `}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-2xl rounded-bl-md text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-green-200">
              <div className="flex gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.action();
                      generateResponse(action.text);
                    }}
                    className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors"
                  >
                    <action.icon className="w-3 h-3" />
                    {action.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-green-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Mentor Owl anything..."
                  className="flex-1 px-3 py-2 border border-green-300 rounded-full focus:outline-none focus:border-green-500 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorOwl;