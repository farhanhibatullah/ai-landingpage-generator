
import React, { useState } from 'react';
import { Resource } from '../types';

const RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Mastering the Hero Section',
    category: 'Copywriting',
    type: 'Article',
    time: '5 min',
    difficulty: 'Beginner',
    description: 'Learn how to write headlines that grab attention and stop the scroll.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'res-2',
    title: 'AI Prompting for Modern Designers',
    category: 'AI Prompting Tips',
    type: 'Tutorial',
    time: '12 min',
    difficulty: 'Intermediate',
    description: 'Advanced techniques to get the perfect visuals from AI image engines.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'res-3',
    title: 'Landing Page Conversion Checklist',
    category: 'UI/UX & Conversion',
    type: 'Checklist',
    time: '3 min',
    difficulty: 'Beginner',
    description: '25 points you must check before launching your next landing page.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'res-4',
    title: 'Optimal Deployment with Netlify',
    category: 'Deployment & Tech',
    type: 'Tutorial',
    time: '8 min',
    difficulty: 'Intermediate',
    description: 'A step-by-step guide to hosting your generated code for free.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'res-5',
    title: 'Landing Page Basics 101',
    category: 'Landing Page Basics',
    type: 'Video',
    time: '15 min',
    difficulty: 'Beginner',
    description: 'The fundamental pillars of a successful one-page website.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'res-6',
    title: 'Common Conversion Killers',
    category: 'UI/UX & Conversion',
    type: 'Prompt examples',
    time: '7 min',
    difficulty: 'Advanced',
    description: 'Avoid these UX patterns that are hurting your bounce rate.',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800'
  }
];

interface ResourcesPageProps {
  onNavigateHome: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigateHome }) => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Landing Page Basics', 'Copywriting', 'UI/UX & Conversion', 'AI Prompting Tips', 'Deployment & Tech'];

  const filteredResources = RESOURCES.filter(res => filter === 'All' || res.category === filter);

  return (
    <div className="bg-white dark:bg-slate-950 pb-20">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          Build better pages with <span className="text-indigo-600 dark:text-indigo-400">proven knowledge.</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
          Guides, templates, and best practices curated by conversion experts.
        </p>
      </section>

      {/* Featured Content */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative bg-indigo-600 rounded-[2.5rem] overflow-hidden p-10 flex flex-col justify-end min-h-[400px] shadow-2xl shadow-indigo-500/20">
            <img 
              src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
              alt="Featured 1"
            />
            <div className="relative space-y-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest">Featured Article</span>
              <h2 className="text-3xl font-heading font-extrabold text-white">How to write high-converting hero sections</h2>
              <p className="text-indigo-100 text-sm max-w-md">Learn the 3-step formula used by top agencies to design heroes that convert at 20%+ rates.</p>
              <button className="flex items-center space-x-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                <span>Read Guide</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
          <div className="group relative bg-slate-900 rounded-[2.5rem] overflow-hidden p-10 flex flex-col justify-end min-h-[400px] shadow-2xl shadow-slate-900/20">
             <img 
              src="https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
              alt="Featured 2"
            />
            <div className="relative space-y-4">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest">Pro Insight</span>
              <h2 className="text-3xl font-heading font-extrabold text-white">Common landing page mistakes (and how to fix them)</h2>
              <p className="text-slate-400 text-sm max-w-md">The silent conversion killers that are costing you leads every single day.</p>
              <button className="flex items-center space-x-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                <span>View Mistakes</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                filter === cat 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' 
                : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Resource Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredResources.map(res => (
          <div key={res.id} className="group flex flex-col bg-white dark:bg-slate-900/30 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="aspect-video overflow-hidden relative">
              <img src={res.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={res.title} />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">{res.type}</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{res.category}</span>
                <div className="flex items-center space-x-3 text-slate-400 text-[10px] font-bold uppercase">
                  <span className="flex items-center space-x-1"><i className="far fa-clock"></i> <span>{res.time}</span></span>
                  <span className="flex items-center space-x-1"><i className="fas fa-signal"></i> <span>{res.difficulty}</span></span>
                </div>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{res.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 line-clamp-2">{res.description}</p>
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 group/btn">
                  <span>View Content</span>
                  <i className="fas fa-chevron-right text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Soft CTA */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-12 text-center space-y-8 border border-slate-200 dark:border-slate-800">
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white">Ready to apply what you've learned?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Put these principles to use and architect your professional landing page in seconds with our AI engine.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
            >
              Start Generating
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              Go Pro for $9/mo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
