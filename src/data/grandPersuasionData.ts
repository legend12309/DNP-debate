import { EmotionEvidenceStatement, AudienceGroup, ToneOption, MixPhrase, SpeechPart } from '../types/GrandPersuasion';

export const emotionEvidenceStatements: EmotionEvidenceStatement[] = [
  {
    id: 'stmt1',
    text: "Studies show that 73% of students perform better with later start times.",
    type: 'factual',
    explanation: "This uses specific statistics and research data to support the claim."
  },
  {
    id: 'stmt2',
    text: "Imagine how exhausted you feel dragging yourself out of bed at 6 AM every morning.",
    type: 'emotional',
    explanation: "This appeals to personal experience and feelings rather than facts."
  },
  {
    id: 'stmt3',
    text: "The American Academy of Sleep Medicine recommends high schools start after 8:30 AM.",
    type: 'factual',
    explanation: "This cites a credible medical organization's official recommendation."
  },
  {
    id: 'stmt4',
    text: "Every parent knows the struggle of getting teenagers up for early morning classes.",
    type: 'emotional',
    explanation: "This appeals to shared parental experiences and emotions."
  },
  {
    id: 'stmt5',
    text: "Schools with later start times report 15% fewer tardiness incidents.",
    type: 'factual',
    explanation: "This provides measurable data comparing different school policies."
  },
  {
    id: 'stmt6',
    text: "Picture students arriving alert and ready to learn instead of half-asleep.",
    type: 'emotional',
    explanation: "This uses imagery to create an emotional vision of the outcome."
  },
  {
    id: 'stmt7',
    text: "Adolescent circadian rhythms naturally shift sleep cycles 2 hours later.",
    type: 'factual',
    explanation: "This presents scientific information about teenage biology."
  },
  {
    id: 'stmt8',
    text: "We're robbing our children of their potential by forcing unnatural schedules.",
    type: 'emotional',
    explanation: "This uses strong emotional language like 'robbing' to create urgency."
  },
  {
    id: 'stmt9',
    text: "Districts implementing later start times saw graduation rates increase by 11%.",
    type: 'factual',
    explanation: "This provides concrete statistical evidence of policy outcomes."
  },
  {
    id: 'stmt10',
    text: "Don't let another generation suffer through the fog of sleep deprivation.",
    type: 'emotional',
    explanation: "This creates urgency and appeals to protective instincts."
  }
];

export const audienceGroups: AudienceGroup[] = [
  {
    id: 'students',
    name: 'High School Students',
    description: 'Teenagers who want relatable, energetic communication',
    icon: '🎓',
    color: 'from-blue-400 to-purple-500',
    preferredTone: 'casual'
  },
  {
    id: 'parents',
    name: 'Parent Committee',
    description: 'Adults concerned about practical impacts on families',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-green-400 to-blue-500',
    preferredTone: 'caring'
  },
  {
    id: 'officials',
    name: 'School Board',
    description: 'Officials who need data-driven, professional arguments',
    icon: '🏛️',
    color: 'from-purple-400 to-pink-500',
    preferredTone: 'formal'
  }
];

export const toneOptions: ToneOption[] = [
  {
    id: 'casual1',
    text: "Look, we all know mornings are rough, but this is about way more than just sleeping in.",
    tone: 'casual',
    audienceMatch: 'students'
  },
  {
    id: 'caring1',
    text: "As parents, we want what's best for our children's health and academic success.",
    tone: 'caring',
    audienceMatch: 'parents'
  },
  {
    id: 'formal1',
    text: "Research consistently demonstrates the academic and health benefits of later start times.",
    tone: 'formal',
    audienceMatch: 'officials'
  },
  {
    id: 'casual2',
    text: "Imagine actually feeling awake during first period instead of zombie-walking through class.",
    tone: 'casual',
    audienceMatch: 'students'
  },
  {
    id: 'caring2',
    text: "This change could reduce the daily stress of morning routines for entire families.",
    tone: 'caring',
    audienceMatch: 'parents'
  },
  {
    id: 'formal2',
    text: "Implementation data from 47 districts shows measurable improvements in key metrics.",
    tone: 'formal',
    audienceMatch: 'officials'
  },
  {
    id: 'casual3',
    text: "Trust me, better sleep equals better grades - it's literally that simple.",
    tone: 'casual',
    audienceMatch: 'students'
  },
  {
    id: 'caring3',
    text: "We have the power to give our teenagers the rest they need to thrive.",
    tone: 'caring',
    audienceMatch: 'parents'
  },
  {
    id: 'formal3',
    text: "The fiscal impact analysis shows long-term benefits outweigh transition costs.",
    tone: 'formal',
    audienceMatch: 'officials'
  }
];

export const mixPhrases: MixPhrase[] = [
  // Emotion phrases
  {
    id: 'emotion1',
    text: "Picture the relief on students' faces",
    type: 'emotion',
    category: 'imagery'
  },
  {
    id: 'emotion2',
    text: "We have the power to transform lives",
    type: 'emotion',
    category: 'empowerment'
  },
  {
    id: 'emotion3',
    text: "Every child deserves to reach their potential",
    type: 'emotion',
    category: 'values'
  },
  {
    id: 'emotion4',
    text: "Imagine the pride in their achievements",
    type: 'emotion',
    category: 'aspiration'
  },
  
  // Logic phrases
  {
    id: 'logic1',
    text: "when graduation rates increase by 15%",
    type: 'logic',
    category: 'statistics'
  },
  {
    id: 'logic2',
    text: "because scientific research proves the benefits",
    type: 'logic',
    category: 'evidence'
  },
  {
    id: 'logic3',
    text: "through measurable improvements in academic performance",
    type: 'logic',
    category: 'outcomes'
  },
  {
    id: 'logic4',
    text: "as documented by the American Sleep Foundation",
    type: 'logic',
    category: 'authority'
  }
];

export const speechParts: SpeechPart[] = [
  {
    id: 'opening',
    title: 'Opening Hook',
    placeholder: 'Start with something that grabs attention...',
    type: 'opening'
  },
  {
    id: 'evidence',
    title: 'Key Evidence',
    placeholder: 'Present your strongest factual support...',
    type: 'evidence'
  },
  {
    id: 'emotion',
    title: 'Emotional Appeal',
    placeholder: 'Connect with hearts and values...',
    type: 'emotion'
  },
  {
    id: 'conclusion',
    title: 'Call to Action',
    placeholder: 'End with a powerful call to action...',
    type: 'conclusion'
  }
];