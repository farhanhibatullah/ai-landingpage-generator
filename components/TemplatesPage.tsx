
import React, { useState } from 'react';
import { Template } from '../types';
import { useLanguage } from '../context/LanguageContext';

const TEMPLATES: Template[] = [
  {
    id: 'saas-1',
    name: 'Modern SaaS Flux',
    category: 'SaaS',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    useCase: 'Software platforms & Apps',
    description: 'A clean, high-converting layout with feature grids and interactive pricing.',
    prefill: {
      businessIdea: 'A next-generation SaaS platform for project management using AI to predict deadlines.',
      targetAudience: 'Tech startups and remote teams',
      primaryGoal: 'Waitlist signup',
      toneStyle: 'Professional & Modern',
      extraNotes: 'Add these sections: 1. Live Dashboard Preview, 2. Interactive Integration Grid, 3. API Documentation Snippets, 4. Team Management Visuals, 5. Enterprise Security Badges, 6. Real-time User Activity Feed.'
    }
  },
  {
    id: 'biz-1',
    name: 'Corporate Pulse',
    category: 'Business',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    useCase: 'Agencies & Enterprises',
    description: 'Trusted, authoritative structure with client testimonials and service highlights.',
    prefill: {
      businessIdea: 'A full-service digital marketing agency specialized in B2B growth.',
      targetAudience: 'Enterprise business owners',
      primaryGoal: 'Consultation booking',
      toneStyle: 'Minimalist & Luxury',
      extraNotes: 'Add these sections: 1. Executive Team Carousel, 2. Vertical Industry Case Studies, 3. Strategic Roadmap, 4. Global Client Map, 5. Consulting Process Flow, 6. Partner Network Ecosystem.'
    }
  },
  {
    id: 'brand-1',
    name: 'Creator Canvas',
    category: 'Personal Brand',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
    useCase: 'Influencers & Freelancers',
    description: 'Focuses on personal story, portfolio, and contact outreach.',
    prefill: {
      businessIdea: 'I am a UI/UX designer and content creator sharing insights on YouTube.',
      targetAudience: 'Aspiring designers and brand partners',
      primaryGoal: 'Newsletter subscription',
      toneStyle: 'Vibrant & Creative',
      extraNotes: 'Add these sections: 1. YouTube Video Showcase Gallery, 2. Link-in-bio Icon Grid, 3. Community Shoutouts, 4. Current Brand Collaborations, 5. Hardware/Software Gear List, 6. Creative Process Breakdown.'
    }
  }
];

interface TemplatesPageProps {
  onUseTemplate: (template: Template) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onUseTemplate }) => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const { t } = useLanguage();

  const categories = ['All', 'Business', 'SaaS', 'Events', 'Personal Brand', 'Digital Products'];

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesFilter = filter === 'All' || t.category === filter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.useCase.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-950 pb-20">
      <section className="pt-20 pb-16 px-4 text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          {t('templates_title')} <span className="text-indigo-600 dark:text-indigo-400">Generate in seconds.</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
          {t('templates_subtitle')}
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map(template => (
          <div 
            key={template.id}
            className="group bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={template.thumbnail} 
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 backdrop-blur-sm">
                <button 
                  onClick={() => setSelectedTemplate(template)}
                  className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                >
                  Preview
                </button>
                <button 
                  onClick={() => onUseTemplate(template)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                >
                  Use Template
                </button>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-1 rounded">
                {template.category}
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">{template.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{template.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Detail Modal Localized logic follows... */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedTemplate(null)}></div>
          <div className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">{selectedTemplate.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{selectedTemplate.useCase}</p>
              </div>
              <button onClick={() => setSelectedTemplate(null)} className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              <div className="flex-1 bg-slate-50 dark:bg-slate-950 overflow-auto p-4 lg:p-10">
                 <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 min-h-[600px] flex items-center justify-center relative">
                    <img src={selectedTemplate.thumbnail} className="w-full h-full object-cover opacity-50 grayscale" alt="Preview" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm">
                      <h4 className="text-3xl font-heading font-extrabold mb-4">Template Overview</h4>
                      <p className="max-w-md text-slate-700 dark:text-slate-200 font-medium">LanderGen AI will use this high-conversion framework to architect your unique vision.</p>
                    </div>
                 </div>
              </div>
              <div className="w-full lg:w-80 bg-slate-50 dark:bg-slate-800/50 p-8 border-l border-slate-200 dark:border-slate-800 space-y-8">
                <button 
                  onClick={() => onUseTemplate(selectedTemplate)}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20"
                >
                  Generate with this Model
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
