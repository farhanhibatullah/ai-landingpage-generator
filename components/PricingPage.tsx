
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-slate-950 pb-24">
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-900/50 mb-4">
          <i className="fas fa-crown text-indigo-600 dark:text-indigo-400 text-xs"></i>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Go Professional</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          {t('pricing_title')}
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          {t('pricing_subtitle')}
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {/* Simplified Plans for Localization Demo */}
        <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Essential</h3>
          <div className="text-4xl font-heading font-extrabold text-slate-900 dark:text-white">$0</div>
          <button className="w-full mt-8 py-4 rounded-2xl font-bold border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">Current Plan</button>
        </div>

        <div className="relative p-10 rounded-[2.5rem] border-2 border-indigo-600 bg-indigo-600 text-white shadow-2xl">
          <h3 className="text-lg font-bold mb-2">Pro Performance</h3>
          <div className="text-4xl font-heading font-extrabold">$9/mo</div>
          <button className="w-full mt-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold shadow-xl">Get Started</button>
        </div>
      </section>
    </div>
  );
};
