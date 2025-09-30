import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

const LoginPage: React.FC = () => {
  const { login, t } = useAuth();

  const handleLogin = (role: UserRole) => {
    login(role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div 
        className="w-full max-w-lg p-8 md:p-12 space-y-8 bg-glass-bg rounded-3xl shadow-2xl backdrop-blur-xl border border-glow-border"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
            {t('loginPageTitle')}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            {t('loginPageSubtitle')}
          </p>
        </div>
        
        <div className="flex flex-col space-y-4 pt-4">
          <button
            onClick={() => handleLogin(UserRole.MIGRANT)}
            className="w-full px-4 py-3 text-lg font-bold text-white transition-all duration-300 bg-black/20 rounded-2xl border-2 border-transparent hover:border-accent-pink hover:shadow-glow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-accent-pink"
          >
            {t('loginAsMigrant')}
          </button>
          <button
            onClick={() => handleLogin(UserRole.DOCTOR)}
            className="w-full px-4 py-3 text-lg font-bold text-white transition-all duration-300 bg-black/20 rounded-2xl border-2 border-transparent hover:border-accent-cyan hover:shadow-glow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-accent-cyan"
          >
            {t('loginAsDoctor')}
          </button>
          <button
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full px-4 py-3 text-lg font-bold text-white transition-all duration-300 bg-black/20 rounded-2xl border-2 border-transparent hover:border-white/50 hover:shadow-glow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-white"
          >
            {t('loginAsAdmin')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;