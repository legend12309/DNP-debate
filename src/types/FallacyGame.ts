export interface FallacyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'spotting' | 'evidence' | 'structure';
  xpReward: number;
}

export interface FallacySpottingData {
  dialogue: string;
  speaker: string;
  fallacies: {
    id: string;
    type: string;
    text: string;
    explanation: string;
    position: { start: number; end: number };
  }[];
}

export interface EvidenceEvaluationData {
  argument: string;
  evidence: string;
  correctRating: 'strong' | 'weak' | 'unsupported';
  explanation: string;
}

export interface ArgumentStructureData {
  scenario: string;
  blocks: {
    id: string;
    type: 'claim' | 'evidence' | 'rebuttal' | 'conclusion';
    text: string;
  }[];
  correctOrder: string[];
}

export interface FallacyGameProgress {
  completedChallenges: string[];
  totalXP: number;
  currentChallenge: number;
  level2Unlocked: boolean;
  level3Unlocked: boolean;
}