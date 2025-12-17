
import React, { useState, useEffect } from 'react';
import { Page, UILanguage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const LANGUAGES: UILanguage[] = [
  'English',
  'Bahasa Indonesia',
  'Español',
  'Français',
  'Deutsch',
  '日本語',
  'Русский',
  'Português',
  'Tiếng Việt',
  '한국어',
  '中文 (简体)'
];

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isDark, setIsDark] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && systemTheme)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-slate-950 font-sans">
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-indigo-600 dark:bg-indigo-500 p-2.5 rounded-2xl shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <i className="fas fa-magic text-white text-xl"></i>
            </div>
            <span className="text-2xl font-heading font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              LanderGen AI
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-10 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
            <button 
              onClick={() => onNavigate('templates')}
              className={`transition-all hover:text-indigo-600 dark:hover:text-indigo-400 ${currentPage === 'templates' ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
            >
              {t('nav_templates')}
            </button>
            <button 
              onClick={() => onNavigate('resources')}
              className={`transition-all hover:text-indigo-600 dark:hover:text-indigo-400 ${currentPage === 'resources' ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
            >
              {t('nav_resources')}
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className={`transition-all ${currentPage === 'pricing' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white hover:text-indigo-600'}`}
            >
              {t('nav_pricing')}
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group/lang hidden sm:block">
               <button className="flex items-center space-x-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-indigo-500 transition-all">
                  <i className="fas fa-globe text-indigo-500"></i>
                  <span>{language}</span>
                  <i className="fas fa-chevron-down text-[8px] opacity-50"></i>
               </button>
               <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all z-[100] p-2">
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${language === lang ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            <button 
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:ring-2 hover:ring-indigo-500/20 transition-all"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <button 
              onClick={() => onNavigate('auth')}
              className="hidden md:block bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/10"
            >
              {t('nav_get_started')}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 opacity-50">
            <i className="fas fa-magic"></i>
            <span className="text-sm font-heading font-bold">LanderGen AI</span>
          </div>
          <p className="text-slate-400 dark:text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} {t('footer_copy')}
          </p>
        </div>
      </footer>
    </div>
  );
};
