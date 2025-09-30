import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { Language } from '../../types';

const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

const Header: React.FC = () => {
  const { user, logout, language, setLanguage, t } = useAuth();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between p-4 bg-glass-bg/70 backdrop-blur-lg border-b border-glow-border flex-shrink-0">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-text-secondary hover:text-white transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>
      </div>
      <div className="flex items-center space-x-4">
         <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="px-3 py-2 text-sm bg-brand-bg/50 border border-glow-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          aria-label="Select language"
        >
          <option value={Language.EN}>English</option>
          <option value={Language.ML}>Malayalam</option>
          <option value={Language.HI}>Hindi</option>
          <option value={Language.BN}>Bengali</option>
          <option value={Language.TA}>Tamil</option>
        </select>
        <div className="text-right">
          <p className="font-semibold text-white">{user?.name}</p>
          <p className="text-xs text-text-secondary uppercase tracking-wider">{user?.role ? t(user.role) : ''}</p>
        </div>
        <img
          src={user?.avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-accent-cyan/50"
        />
        <button
          onClick={logout}
          className="p-2 text-text-secondary hover:text-accent-pink transition-colors duration-200 focus:outline-none btn-pulse"
          aria-label="Logout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;