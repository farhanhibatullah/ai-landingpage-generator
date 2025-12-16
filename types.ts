
export interface UserInput {
  businessIdea: string;
  targetAudience: string;
  primaryGoal: string;
  toneStyle: string;
  colorPreference?: string;
  extraNotes?: string;
}

export interface LandingPageData {
  previewHtml: string;
  strategy: string;
  code: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
