
import React, { useState, useEffect } from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

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
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-slate-950">
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 dark:bg-indigo-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <i className="fas fa-magic text-white text-lg"></i>
            </div>
            <span className="text-xl font-heading font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              LanderGen AI
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Templates</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Resources</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-indigo-600 dark:text-indigo-400">Try Pro</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:ring-2 hover:ring-indigo-500/20 transition-all"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <button className="hidden sm:block bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5">
              Get Started
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
            &copy; {new Date().getFullYear()} AI Landing Page Architect. Built for the modern web.
          </p>
        </div>
      </footer>
    </div>
  );
};
