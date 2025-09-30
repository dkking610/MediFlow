import React, { ReactNode } from 'react';
import Header from './Header';
import { useSidebar } from '../../contexts/SidebarContext';

interface LayoutProps {
  children: ReactNode;
  title: string;
  sidebarContent: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, title, sidebarContent }) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex h-screen bg-brand-bg/50 overflow-hidden">
      <div className={`flex-shrink-0 transition-[width] duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        {sidebarContent}
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div key={title} className="zoom-in-content">
            <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-md">{title}</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;