
import React, { useState } from 'react';
import { LandingPageData } from '../types';

interface ResultDisplayProps {
  data: LandingPageData;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'strategy' | 'code'>('preview');

  const fullIframeDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LanderGen AI - Preview</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Plus Jakarta Sans', sans-serif; }
        main { min-height: 100vh; }
      </style>
    </head>
    <body class="bg-white dark:bg-slate-950 transition-colors duration-300">
      ${data.previewHtml}
    </body>
    </html>
  `;

  const downloadCode = () => {
    // Attempt to extract the main index.html block from markdown
    const match = data.code.match(/```html([\s\S]*?)```/i);
    const content = match ? match[1].trim() : data.code;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.code);
    alert('Full source code bundle copied to clipboard!');
  };

  const openInNewTab = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(fullIframeDoc);
      newWindow.document.close();
    } else {
      alert('Please allow popups to open the preview in a new tab.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-8 py-6 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="flex space-x-2 p-1 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full sm:w-auto">
          {(['preview', 'strategy', 'code'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                activeTab === tab 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              {tab === 'strategy' ? 'Architecture' : tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {activeTab === 'preview' && (
            <button
              onClick={openInNewTab}
              className="flex-1 sm:flex-none p-3 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title="Open in New Tab"
            >
              <i className="fas fa-up-right-from-square"></i>
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="flex-1 sm:flex-none p-3 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title="Copy Source"
          >
            <i className="fas fa-copy"></i>
          </button>
          <button
            onClick={downloadCode}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-3 px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/10"
          >
            <i className="fas fa-file-export"></i>
            <span>Export HTML</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar bg-white dark:bg-slate-950">
        {activeTab === 'preview' && (
          <div className="w-full h-full min-h-[700px] bg-slate-50 dark:bg-slate-900">
            <iframe
              title="Landing Page Live Preview"
              srcDoc={fullIframeDoc}
              className="w-full h-full border-none bg-white"
            />
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="p-10 max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="flex items-center space-x-5">
               <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-indigo-500/20">
                 <i className="fas fa-shield-halved"></i>
               </div>
               <div>
                 <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">Strategy Synthesis</h2>
                 <p className="text-slate-500 dark:text-slate-400 text-sm">Targeted insights and architectural roadmap.</p>
               </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {data.strategy}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="h-full bg-slate-950 p-0 relative font-mono text-xs">
            <div className="sticky top-0 left-0 w-full h-12 bg-slate-900 flex items-center px-6 space-x-2 border-b border-slate-800 z-10">
               <div className="flex space-x-1.5 mr-4">
                 <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
               </div>
               <span className="text-slate-500 text-[10px] font-sans font-bold uppercase tracking-widest">Architectural_Bundle.zip</span>
            </div>
            <pre className="p-8 pt-6 text-indigo-300 leading-relaxed overflow-auto max-h-[calc(100%-48px)] whitespace-pre custom-scrollbar">
              {data.code}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
