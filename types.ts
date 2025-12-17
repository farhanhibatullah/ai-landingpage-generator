
export type UILanguage = 
  | 'English' 
  | 'Bahasa Indonesia' 
  | 'Español' 
  | 'Français' 
  | 'Deutsch' 
  | '日本語' 
  | 'Русский' 
  | 'Português' 
  | 'Tiếng Việt' 
  | '한국어' 
  | '中文 (简体)';

export interface UserInput {
  businessIdea: string;
  targetAudience: string;
  primaryGoal: string;
  toneStyle: string;
  colorPreference?: string;
  extraNotes?: string;
  targetLanguage: string;
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

export type Page = 'home' | 'templates' | 'resources' | 'pricing' | 'auth';

export interface Template {
  id: string;
  name: string;
  category: 'Business' | 'SaaS' | 'Events' | 'Personal Brand' | 'Digital Products';
  thumbnail: string;
  useCase: string;
  description: string;
  prefill: {
    businessIdea: string;
    targetAudience: string;
    primaryGoal: string;
    toneStyle: string;
    extraNotes?: string;
  };
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  type: string;
  time: string;
  difficulty: string;
  description: string;
  image: string;
}
