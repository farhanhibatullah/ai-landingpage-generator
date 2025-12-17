
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface AuthPageProps {
  onSuccess: () => void;
  onNavigateHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, onNavigateHome }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signup' && password !== confirmPassword) {
      setError(t('auth_error_mismatch'));
      return;
    }

    // Simulate auth success
    onSuccess();
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-1/4 -left-20 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-xl animate-in fade-in zoom-in duration-500">
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-500/10">
          <div className="flex flex-col items-center text-center mb-8">
            <div 
              className="bg-indigo-600 p-4 rounded-3xl shadow-xl shadow-indigo-500/20 mb-6 cursor-pointer hover:scale-105 transition-transform"
              onClick={onNavigateHome}
            >
              <i className="fas fa-magic text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 dark:text-white mb-2">
              {mode === 'login' ? t('auth_welcome_back') : t('auth_join_us')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              LanderGen AI — Build for the world.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('auth_first_name')}</label>
                  <div className="relative group">
                    <i className="far fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                      placeholder="Jane"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('auth_last_name')}</label>
                  <div className="relative group">
                    <i className="far fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('auth_email')}</label>
              <div className="relative group">
                <i className="far fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('auth_password')}</label>
                {mode === 'login' && (
                  <button type="button" className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    {t('auth_forgot')}
                  </button>
                )}
              </div>
              <div className="relative group">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('auth_confirm_password')}</label>
                <div className="relative group">
                  <i className="fas fa-shield-alt absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
                  <input
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border ${error ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center animate-in shake-in duration-300">
                <i className="fas fa-exclamation-circle mr-1"></i> {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all transform active:scale-[0.98] mt-2"
            >
              {mode === 'login' ? t('auth_cta_login') : t('auth_cta_signup')}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {mode === 'login' ? t('auth_no_account') : t('auth_has_account')}{' '}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError(null);
                }}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                {mode === 'login' ? t('auth_signup') : t('auth_login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
