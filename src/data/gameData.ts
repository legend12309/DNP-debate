import { Scene } from '../types/Game';

export const scenes: Scene[] = [
  {
    id: 'debate-roles',
    title: 'Debate Roles',
    description: 'Master the different roles in competitive debate',
    content: {
      introduction: 'In formal debates, each participant has a specific role that determines their responsibilities and speaking order. Understanding these roles is crucial for effective participation.',
      keyPoints: [
        'Affirmative team argues in favor of the resolution',
        'Negative team argues against the resolution',
        'Moderator ensures fair play and time management',
        'Judges evaluate arguments and determine winners'
      ],
      example: 'In a debate about "Should schools require uniforms?", the affirmative team would argue YES, presenting benefits like equality and focus. The negative team would argue NO, emphasizing individual expression and cost concerns.',
      tips: [
        'Know your role before the debate begins',
        'Prepare arguments that fit your position',
        'Respect the moderator\'s time limits',
        'Address judges directly when making key points'
      ]
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'Which team argues in favor of the resolution?',
          options: ['Negative Team', 'Affirmative Team', 'Moderator', 'Judges'],
          correctAnswer: 1,
          explanation: 'The affirmative team always argues in favor of the resolution or topic statement.'
        },
        {
          id: 'q2',
          question: 'What is the primary role of the moderator?',
          options: ['Argue for one side', 'Ensure fair play and time management', 'Decide the winner', 'Provide evidence'],
          correctAnswer: 1,
          explanation: 'The moderator maintains order, enforces rules, and manages speaking time fairly.'
        },
        {
          id: 'q3',
          question: 'Who determines the winner of a debate?',
          options: ['The moderator', 'The audience', 'The judges', 'The affirmative team'],
          correctAnswer: 2,
          explanation: 'Judges evaluate the arguments, evidence, and delivery to determine the winner.'
        }
      ]
    },
    xpReward: 100,
    badge: {
      id: 'role-master',
      name: 'Role Master',
      description: 'Mastered debate roles and responsibilities',
      icon: 'Users',
      color: 'from-blue-500 to-purple-600'
    }
  },
  {
    id: 'debate-rules',
    title: 'Debate Rules',
    description: 'Learn the fundamental rules that govern debates',
    content: {
      introduction: 'Debate rules ensure fair competition and productive discussion. These guidelines help maintain order and give everyone equal opportunity to present their case.',
      keyPoints: [
        'Strict time limits for each speaking segment',
        'No interruptions during opponent\'s speaking time',
        'Evidence must be credible and properly cited',
        'Personal attacks are prohibited - focus on arguments'
      ],
      example: 'In a 6-minute constructive speech, a debater must present their main arguments within the time limit. If they exceed the time, judges may not consider the extra content.',
      tips: [
        'Practice timing your speeches beforehand',
        'Prepare backup points in case you finish early',
        'Always cite your sources clearly',
        'Stay respectful even when disagreeing strongly'
      ]
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'What happens if a debater exceeds their time limit?',
          options: ['They get extra points', 'Judges may ignore the extra content', 'The debate is restarted', 'They automatically win'],
          correctAnswer: 1,
          explanation: 'Time limits are strict - content beyond the limit typically isn\'t considered by judges.'
        },
        {
          id: 'q2',
          question: 'Are personal attacks allowed in formal debates?',
          options: ['Yes, if they\'re clever', 'No, focus on arguments only', 'Only against the opponent\'s evidence', 'Only in the final speech'],
          correctAnswer: 1,
          explanation: 'Personal attacks are prohibited - debates should focus on ideas and arguments, not individuals.'
        },
        {
          id: 'q3',
          question: 'What makes evidence credible in a debate?',
          options: ['It\'s from the internet', 'It supports your argument', 'It\'s properly cited and from reliable sources', 'It\'s the most recent'],
          correctAnswer: 2,
          explanation: 'Credible evidence must be from reliable sources and properly cited to be valuable in debate.'
        }
      ]
    },
    xpReward: 150,
    badge: {
      id: 'rule-keeper',
      name: 'Rule Keeper',
      description: 'Understands and follows debate rules',
      icon: 'BookOpen',
      color: 'from-green-500 to-blue-600'
    }
  },
  {
    id: 'rebuttals',
    title: 'Rebuttals',
    description: 'Master the art of responding to opposing arguments',
    content: {
      introduction: 'Rebuttals are responses to your opponent\'s arguments. They\'re crucial for weakening the opposing case and strengthening your own position.',
      keyPoints: [
        'Address the opponent\'s strongest arguments first',
        'Use evidence to contradict their claims',
        'Point out logical flaws in their reasoning',
        'Rebuild your own arguments after attacking theirs'
      ],
      example: 'If your opponent argues "School uniforms reduce bullying," you might rebut with "Studies from X University show uniforms actually increase social tension by 15%, as students find other ways to express differences."',
      tips: [
        'Take notes during opponent\'s speeches',
        'Prioritize which arguments to address',
        'Use the "even if" strategy for stronger rebuttals',
        'Don\'t forget to extend your own arguments'
      ]
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'Which arguments should you address first in a rebuttal?',
          options: ['The weakest ones', 'The strongest ones', 'The most recent ones', 'The shortest ones'],
          correctAnswer: 1,
          explanation: 'Address the strongest arguments first - they pose the greatest threat to your position.'
        },
        {
          id: 'q2',
          question: 'What is the "even if" strategy?',
          options: ['Agreeing with everything', 'Ignoring opponent arguments', 'Showing your case wins even if their argument is true', 'Making conditional statements'],
          correctAnswer: 2,
          explanation: 'The "even if" strategy shows that your position is still stronger even if you accept their argument.'
        },
        {
          id: 'q3',
          question: 'Why is it important to rebuild your arguments after attacking theirs?',
          options: ['To use more time', 'To remind judges of your position', 'To show you have more evidence', 'To confuse the opponent'],
          correctAnswer: 1,
          explanation: 'Rebuilding reinforces your position and reminds judges why your case is stronger.'
        }
      ]
    },
    xpReward: 200,
    badge: {
      id: 'rebuttal-warrior',
      name: 'Rebuttal Warrior',
      description: 'Skilled at countering opposing arguments',
      icon: 'Shield',
      color: 'from-red-500 to-orange-600'
    }
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    description: 'Learn how debates are judged and evaluated',
    content: {
      introduction: 'Evaluation is the process of determining which side presented the stronger case. Understanding evaluation criteria helps you focus on what matters most.',
      keyPoints: [
        'Arguments: strength, logic, and evidence quality',
        'Delivery: clarity, confidence, and persuasiveness',
        'Organization: clear structure and smooth transitions',
        'Responsiveness: how well you addressed opposing arguments'
      ],
      example: 'A judge might think: "Team A had stronger evidence, but Team B addressed more of the opponent\'s arguments and had clearer organization. Team B wins on balance."',
      tips: [
        'Focus on all evaluation criteria, not just arguments',
        'Make your key points crystal clear',
        'Use signposting to show your organization',
        'Always address major opposing arguments'
      ]
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'What are the main evaluation criteria in debates?',
          options: ['Only the strength of arguments', 'Arguments, delivery, organization, and responsiveness', 'How loud you speak', 'Number of sources cited'],
          correctAnswer: 1,
          explanation: 'Judges evaluate multiple aspects: arguments, delivery, organization, and how well you respond to opponents.'
        },
        {
          id: 'q2',
          question: 'What is "signposting" in debate?',
          options: ['Using visual aids', 'Clearly marking your arguments and transitions', 'Pointing at the opponent', 'Writing on a whiteboard'],
          correctAnswer: 1,
          explanation: 'Signposting helps judges follow your argument structure with clear markers and transitions.'
        },
        {
          id: 'q3',
          question: 'Why is responsiveness important in evaluation?',
          options: ['It shows you\'re listening', 'It demonstrates engagement with the debate', 'It proves you understand the topic', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Responsiveness shows listening, engagement, and understanding - all crucial for winning debates.'
        }
      ]
    },
    xpReward: 250,
    badge: {
      id: 'evaluation-expert',
      name: 'Evaluation Expert',
      description: 'Understands how debates are judged',
      icon: 'Star',
      color: 'from-purple-500 to-pink-600'
    }
  }
];