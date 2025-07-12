export interface EmotionEvidenceStatement {
  id: string;
  text: string;
  type: 'emotional' | 'factual';
  explanation: string;
}

export interface AudienceGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  preferredTone: string;
}

export interface ToneOption {
  id: string;
  text: string;
  tone: string;
  audienceMatch: string;
}

export interface MixPhrase {
  id: string;
  text: string;
  type: 'emotion' | 'logic';
  category: string;
}

export interface SpeechPart {
  id: string;
  title: string;
  placeholder: string;
  type: 'opening' | 'evidence' | 'emotion' | 'conclusion';
}

export interface AudienceReaction {
  type: 'cheer' | 'confused' | 'heart' | 'applause' | 'thinking';
  intensity: number;
  message: string;
}

export interface GrandPersuasionProgress {
  currentScene: number;
  completedScenes: string[];
  totalScore: number;
  finalSpeechParts: { [key: string]: string };
  audienceApproval: number;
  championBadgeEarned: boolean;
}