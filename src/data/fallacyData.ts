import { FallacySpottingData, EvidenceEvaluationData, ArgumentStructureData } from '../types/FallacyGame';

export const fallacySpottingData: FallacySpottingData[] = [
  {
    dialogue: "You can't trust Sarah's argument about climate change because she's just a college student who doesn't even own a car.",
    speaker: "Alex",
    fallacies: [
      {
        id: 'ad-hominem-1',
        type: 'Ad Hominem',
        text: "she's just a college student",
        explanation: "Attacking the person rather than addressing their argument about climate change.",
        position: { start: 67, end: 91 }
      }
    ]
  },
  {
    dialogue: "If we allow students to retake tests, soon they'll expect to retake entire courses, then degrees, and eventually our education system will collapse completely.",
    speaker: "Teacher",
    fallacies: [
      {
        id: 'slippery-slope-1',
        type: 'Slippery Slope',
        text: "soon they'll expect to retake entire courses, then degrees, and eventually our education system will collapse",
        explanation: "Assuming one small change will lead to extreme consequences without evidence.",
        position: { start: 40, end: 147 }
      }
    ]
  },
  {
    dialogue: "Everyone knows that social media is bad for teenagers. My neighbor agrees, and so does my coworker.",
    speaker: "Parent",
    fallacies: [
      {
        id: 'bandwagon-1',
        type: 'Bandwagon',
        text: "Everyone knows",
        explanation: "Claiming something is true because 'everyone' believes it, without providing evidence.",
        position: { start: 0, end: 13 }
      }
    ]
  }
];

export const evidenceEvaluationData: EvidenceEvaluationData[] = [
  {
    argument: "Schools should start later in the morning to improve student performance.",
    evidence: "A 2019 study by the American Academy of Sleep Medicine found that high schools starting after 8:30 AM saw a 15% increase in graduation rates and 20% fewer tardiness incidents.",
    correctRating: 'strong',
    explanation: "This evidence is strong because it cites a credible source, includes specific statistics, and directly supports the argument."
  },
  {
    argument: "Video games cause violent behavior in children.",
    evidence: "My friend's son plays violent games and he got in trouble at school once.",
    correctRating: 'weak',
    explanation: "This evidence is weak because it's anecdotal (one personal example) and doesn't establish a clear causal relationship."
  },
  {
    argument: "Organic food is always healthier than conventional food.",
    evidence: "Organic food tastes better and is more expensive, so it must be healthier.",
    correctRating: 'unsupported',
    explanation: "This evidence is unsupported because taste and price don't prove health benefits. No scientific data is provided."
  },
  {
    argument: "Regular exercise improves mental health.",
    evidence: "Multiple peer-reviewed studies show that 30 minutes of exercise 3 times per week reduces symptoms of depression by 25-30% in adults.",
    correctRating: 'strong',
    explanation: "Strong evidence with multiple studies, specific measurements, and clear connection to the claim."
  }
];

export const argumentStructureData: ArgumentStructureData[] = [
  {
    scenario: "Should schools require students to wear uniforms?",
    blocks: [
      {
        id: 'claim-1',
        type: 'claim',
        text: "Schools should require students to wear uniforms because they reduce distractions and promote equality."
      },
      {
        id: 'evidence-1',
        type: 'evidence',
        text: "A study of 50 schools found that uniform policies led to 23% fewer disciplinary incidents and improved focus in classrooms."
      },
      {
        id: 'rebuttal-1',
        type: 'rebuttal',
        text: "While critics argue uniforms limit self-expression, the benefits of reduced bullying and increased focus outweigh these concerns."
      },
      {
        id: 'conclusion-1',
        type: 'conclusion',
        text: "Therefore, implementing school uniforms creates a better learning environment for all students."
      }
    ],
    correctOrder: ['claim-1', 'evidence-1', 'rebuttal-1', 'conclusion-1']
  },
  {
    scenario: "Should social media platforms be regulated by the government?",
    blocks: [
      {
        id: 'claim-2',
        type: 'claim',
        text: "Government regulation of social media is necessary to protect user privacy and prevent misinformation."
      },
      {
        id: 'evidence-2',
        type: 'evidence',
        text: "Data breaches affected 500 million users in 2023, and false information spreads 6 times faster than factual content."
      },
      {
        id: 'rebuttal-2',
        type: 'rebuttal',
        text: "Though some worry about free speech restrictions, targeted regulations can protect users while preserving open dialogue."
      },
      {
        id: 'conclusion-2',
        type: 'conclusion',
        text: "Smart regulation will create safer digital spaces without stifling innovation or free expression."
      }
    ],
    correctOrder: ['claim-2', 'evidence-2', 'rebuttal-2', 'conclusion-2']
  }
];