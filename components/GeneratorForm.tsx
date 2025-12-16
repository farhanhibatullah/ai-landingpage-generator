
import React, { useState } from 'react';
import { UserInput } from '../types';

interface GeneratorFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    businessIdea: '',
    targetAudience: '',
    primaryGoal: '',
    toneStyle: 'Professional & Modern',
    colorPreference: '#4F46E5',
    extraNotes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600";
  const labelClasses = "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] shadow-2xl shadow-indigo-500/5 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
      <div className="space-y-2">
        <label className={labelClasses}>Core Business Idea</label>
        <textarea
          required
          name="businessIdea"
          placeholder="Describe what you're building in detail..."
          className={`${inputClasses} h-32 resize-none`}
          value={formData.businessIdea}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClasses}>Target Audience</label>
          <input
            required
            name="targetAudience"
            type="text"
            placeholder="Who is this for?"
            className={inputClasses}
            value={formData.targetAudience}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Primary Goal</label>
          <input
            required
            name="primaryGoal"
            type="text"
            placeholder="Waitlist, sales, or leads?"
            className={inputClasses}
            value={formData.primaryGoal}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClasses}>Brand Persona</label>
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
          <label className={labelClasses}>Accent Color</label>
          <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-900 p-2 px-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <input
              name="colorPreference"
              type="color"
              className="h-8 w-12 rounded-lg border-none cursor-pointer bg-transparent"
              value={formData.colorPreference}
              onChange={handleChange}
            />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{formData.colorPreference}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClasses}>Additional Requirements</label>
        <input
          name="extraNotes"
          type="text"
          placeholder="Any specific sections or features?"
          className={inputClasses}
          value={formData.extraNotes}
          onChange={handleChange}
        />
      </div>

      <button
        disabled={isLoading}
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
            <span className="tracking-wide">ARCHITECTING...</span>
          </>
        ) : (
          <>
            <i className="fas fa-sparkles text-yellow-300"></i>
            <span className="tracking-wide uppercase">Launch Engine</span>
          </>
        )}
      </button>
    </form>
  );
};
