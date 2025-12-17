
import React, { useState, useEffect } from 'react';
import { UserInput, UILanguage } from '../types';
import { translateInputToEnglish, getSectionRecommendations } from '../services/gemini';
import { useLanguage } from '../context/LanguageContext';

interface GeneratorFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
  initialData?: UserInput;
}

const LANGUAGES: UILanguage[] = [
  'English',
  'Bahasa Indonesia',
  'Español',
  'Français',
  'Deutsch',
  'Русский',
  'Português',
  '日本語',
  '한국어',
  'Tiếng Việt',
  '中文 (简体)'
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, isLoading, initialData }) => {
  const { language, t } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<UserInput>(initialData || {
    businessIdea: '',
    targetAudience: '',
    primaryGoal: '',
    toneStyle: 'Professional & Modern',
    colorPreference: '#4F46E5',
    extraNotes: '',
    targetLanguage: language
  });

  // Sync output language with UI language change
  useEffect(() => {
    setFormData(prev => ({ ...prev, targetLanguage: language }));
  }, [language]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTranslate = async () => {
    if (!formData.businessIdea && !formData.targetAudience && !formData.primaryGoal) return;
    
    setIsTranslating(true);
    try {
      const translated = await translateInputToEnglish(formData);
      setFormData(prev => ({
        ...prev,
        ...translated
      }));
    } catch (error) {
      console.error("Translation trigger failed", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSuggestSections = async () => {
    if (!formData.businessIdea || !formData.primaryGoal) {
      alert("Please fill in Business Idea and Primary Goal first!");
      return;
    }

    setIsSuggesting(true);
    try {
      const recs = await getSectionRecommendations(formData.businessIdea, formData.primaryGoal);
      setSuggestions(recs);
    } catch (error) {
      console.error("Suggestions failed", error);
    } finally {
      setIsSuggesting(false);
    }
  };

  const addSuggestion = (s: string) => {
    const currentNotes = formData.extraNotes?.trim() || "";
    const prefix = currentNotes ? currentNotes.endsWith('.') ? ' ' : '. ' : '';
    setFormData(prev => ({
      ...prev,
      extraNotes: `${currentNotes}${prefix}${s}.`
    }));
    setSuggestions(prev => prev.filter(item => item !== s));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600";
  const labelClasses = "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2";

  const hasContent = formData.businessIdea || formData.targetAudience || formData.primaryGoal;

  return (
    <form onSubmit={handleSubmit} className="relative space-y-8 bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] shadow-2xl shadow-indigo-500/5 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
      
      {/* Utility Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <label className={labelClasses}>{t('form_lang')}</label>
          <select 
            name="targetLanguage" 
            value={formData.targetLanguage} 
            onChange={handleChange}
            className="text-[10px] font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-lg px-3 py-1.5 cursor-pointer text-indigo-600 dark:text-indigo-400"
          >
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
        
        {hasContent && (
          <button
            type="button"
            onClick={handleTranslate}
            disabled={isTranslating}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
              isTranslating 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50'
            }`}
          >
            {isTranslating ? (
              <><i className="fas fa-circle-notch fa-spin"></i><span>{t('form_translate_btn')}...</span></>
            ) : (
              <><i className="fas fa-language text-sm"></i><span>{t('form_translate_btn')} (EN)</span></>
            )}
          </button>
        )}
      </div>

      <div className="space-y-2">
        <label className={labelClasses}>{t('form_business_label')}</label>
        <textarea
          required
          name="businessIdea"
          placeholder={t('form_business_placeholder')}
          className={`${inputClasses} h-32 resize-none`}
          value={formData.businessIdea}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClasses}>{t('form_audience_label')}</label>
          <input
            required
            name="targetAudience"
            type="text"
            placeholder={t('form_audience_placeholder')}
            className={inputClasses}
            value={formData.targetAudience}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>{t('form_goal_label')}</label>
          <input
            required
            name="primaryGoal"
            type="text"
            placeholder={t('form_goal_placeholder')}
            className={inputClasses}
            value={formData.primaryGoal}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClasses}>{t('form_persona_label')}</label>
          <select
            name="toneStyle"
            className={inputClasses}
            value={formData.toneStyle}
            onChange={handleChange}
          >
            <option>Professional & Modern</option>
            <option>Minimalist & Luxury</option>
            <option>Vibrant & Creative</option>
            <option>Bold & Aggressive</option>
            <option>Empathetic & Warm</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>{t('form_color_label')}</label>
          <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 p-2 pl-3 rounded-xl border border-slate-200 dark:border-slate-800 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
            <input
              name="colorPreference"
              type="color"
              className="h-10 w-10 min-w-[2.5rem] rounded-lg border-none cursor-pointer bg-transparent"
              value={formData.colorPreference}
              onChange={handleChange}
            />
            <input
              name="colorPreference"
              type="text"
              placeholder="#FFFFFF"
              className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-slate-900 dark:text-slate-100 uppercase placeholder:text-slate-400"
              value={formData.colorPreference}
              onChange={handleChange}
              maxLength={7}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className={labelClasses}>{t('form_extra_label')}</label>
          <button 
            type="button"
            onClick={handleSuggestSections}
            disabled={isSuggesting}
            className={`text-[10px] font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-colors ${isSuggesting ? 'text-slate-400' : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700'}`}
          >
            {isSuggesting ? (
              <><i className="fas fa-sparkles animate-spin"></i><span>{t('form_suggest_loading')}</span></>
            ) : (
              <><i className="fas fa-magic"></i><span>{t('form_suggest_btn')}</span></>
            )}
          </button>
        </div>
        
        <input
          name="extraNotes"
          type="text"
          placeholder={t('form_extra_placeholder')}
          className={inputClasses}
          value={formData.extraNotes}
          onChange={handleChange}
        />

        {/* AI Recommendations Area */}
        {suggestions.length > 0 && (
          <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => addSuggestion(s)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center space-x-2"
                >
                  <i className="fas fa-plus text-[9px] opacity-50"></i>
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        disabled={isLoading || isTranslating || isSuggesting}
        type="submit"
        className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 shadow-xl ${
          isLoading 
            ? 'bg-slate-400 dark:bg-slate-800 cursor-not-allowed shadow-none' 
            : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-indigo-500/20'
        }`}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            <span className="tracking-wide uppercase">{t('form_submit_loading')}</span>
          </>
        ) : (
          <>
            <i className="fas fa-bolt text-yellow-300"></i>
            <span className="tracking-wide uppercase">{t('form_submit')}</span>
          </>
        )}
      </button>
    </form>
  );
};
