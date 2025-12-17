
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { GeneratorForm } from './components/GeneratorForm';
import { ResultDisplay } from './components/ResultDisplay';
import { TemplatesPage } from './components/TemplatesPage';
import { ResourcesPage } from './components/ResourcesPage';
import { PricingPage } from './components/PricingPage';
import { AuthPage } from './components/AuthPage';
import { UserInput, LandingPageData, GenerationStatus, Template, Page } from './types';
import { generateLandingPage } from './services/gemini';
import { useLanguage } from './context/LanguageContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [result, setResult] = useState<LandingPageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prefilledData, setPrefilledData] = useState<UserInput | undefined>(undefined);
  const { t, language } = useLanguage();

  const handleGenerate = async (input: UserInput) => {
    setStatus(GenerationStatus.LOADING);
    setError(null);
    try {
      const data = await generateLandingPage(input);
      setResult(data);
      setStatus(GenerationStatus.SUCCESS);
      
      requestAnimationFrame(() => {
        const resultSection = document.getElementById('results-section');
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || 'The architecture engine encountered a structural error.');
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleUseTemplate = (template: Template) => {
    setPrefilledData({
      businessIdea: template.prefill.businessIdea,
      targetAudience: template.prefill.targetAudience,
      primaryGoal: template.prefill.primaryGoal,
      toneStyle: template.prefill.toneStyle,
      colorPreference: '#4F46E5',
      extraNotes: template.prefill.extraNotes || '',
      targetLanguage: language
    });
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'auth':
        return <AuthPage onSuccess={handleAuthSuccess} onNavigateHome={() => setCurrentPage('home')} />;
      case 'templates':
        return <TemplatesPage onUseTemplate={handleUseTemplate} />;
      case 'resources':
        return <ResourcesPage onNavigateHome={() => setCurrentPage('home')} />;
      case 'pricing':
        return <PricingPage />;
      case 'home':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-24 items-start">
              <div className="xl:col-span-5 space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-900/50">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{t('hero_badge')}</span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                    {t('hero_title')} <span className="text-indigo-600 dark:text-indigo-400">{t('hero_title_accent')}</span>
                  </h1>
                  <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {t('hero_subtitle')}
                  </p>
                </div>

                <GeneratorForm 
                  onSubmit={handleGenerate} 
                  isLoading={status === GenerationStatus.LOADING} 
                  initialData={prefilledData}
                />
                
                {status === GenerationStatus.ERROR && (
                  <div className="p-6 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-[2rem] flex items-start space-x-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-exclamation-triangle text-red-600 dark:text-red-400"></i>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-red-900 dark:text-red-300">Generation Failed</p>
                      <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="xl:col-span-7 scroll-mt-24" id="results-section">
                {status === GenerationStatus.IDLE && (
                  <div className="relative group h-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative h-[700px] flex flex-col items-center justify-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-12 text-center transition-all">
                      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                        <i className="fas fa-rocket text-slate-300 dark:text-slate-700 text-4xl"></i>
                      </div>
                      <h3 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">{t('idle_title')}</h3>
                      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed text-lg">
                        {t('idle_subtitle')}
                      </p>
                    </div>
                  </div>
                )}

                {status === GenerationStatus.LOADING && (
                  <div className="h-[700px] flex flex-col items-center justify-center bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-12 text-center relative overflow-hidden transition-all shadow-2xl">
                    <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
                    </div>
                    <div className="relative mb-10">
                      <div className="w-32 h-32 border-4 border-indigo-100 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <i className="fas fa-magic text-indigo-600 dark:text-indigo-400 text-4xl animate-pulse"></i>
                      </div>
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">{t('loading_title')}</h3>
                    <div className="space-y-4 max-w-sm">
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 animate-[loading_2s_ease-in-out_infinite]"></div>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        {t('loading_subtitle')}
                      </p>
                    </div>
                  </div>
                )}

                {status === GenerationStatus.SUCCESS && result && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-700 h-[850px]">
                    <ResultDisplay data={result} />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderContent()}
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40 dark:opacity-[0.15]">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
    </Layout>
  );
};

export default App;
