import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { UserRole } from '../../types';

interface NavLink {
  label: string;
  icon: React.ReactElement;
}

interface SidebarProps {
    activeView?: string;
    onNavigate?: (view: string) => void;
}

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const HealthRecordIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const AppointmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const AnalyticsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
const RoadmapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-6V4a1 1 0 011-1h4a1 1 0 011 1v3m-5 9l5.447 2.724A1 1 0 0017 18.382V7.618a1 1 0 00-1.447-.894L11 9m0 4h.01" /></svg>;
const AppLogoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-accent-cyan flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>;

const Sidebar: React.FC<SidebarProps> = ({ activeView = 'Dashboard', onNavigate }) => {
  const { user, t } = useAuth();
  const { isSidebarOpen } = useSidebar();

  const migrantLinks: NavLink[] = [
    { label: t('dashboard'), icon: <DashboardIcon /> },
    { label: t('healthRecords'), icon: <HealthRecordIcon /> },
    { label: t('appointments'), icon: <AppointmentIcon /> },
    { label: t('aiChatbot'), icon: <ChatIcon /> },
  ];
  
  const doctorLinks: NavLink[] = [
    { label: t('dashboard'), icon: <DashboardIcon /> },
    { label: t('migrantSearch'), icon: <SearchIcon /> },
  ];
  
  const adminLinks: NavLink[] = [
    { label: t('dashboard'), icon: <DashboardIcon /> },
    { label: t('userManagement'), icon: <UsersIcon /> },
    { label: t('analytics'), icon: <AnalyticsIcon /> },
    { label: t('roadmap'), icon: <RoadmapIcon /> },
  ];
  
  let links: NavLink[] = [];
  if (user?.role === UserRole.MIGRANT) links = migrantLinks;
  else if (user?.role === UserRole.DOCTOR) links = doctorLinks;
  else if (user?.role === UserRole.ADMIN) links = adminLinks;

  const handleClick = (label: string) => {
    if (onNavigate) {
      // Find the original key to navigate, to keep navigation logic language-agnostic
      const allLinks = [...migrantLinks, ...doctorLinks, ...adminLinks];
      const linkObject = allLinks.find(l => l.label === label);
      
      // A simple reverse mapping. May need a more robust solution for complex apps.
      const originalLabel = {
          [t('dashboard')]: 'Dashboard',
          [t('healthRecords')]: 'Health Records',
          [t('appointments')]: 'Appointments',
          [t('aiChatbot')]: 'AI Chatbot',
          [t('migrantSearch')]: 'Migrant Search',
          [t('userManagement')]: 'User Management',
          [t('analytics')]: 'Analytics',
          [t('roadmap')]: 'Roadmap',
      }[label] || 'Dashboard';

      onNavigate(originalLabel);
    }
  };

  return (
    <aside className="flex flex-col w-full h-full p-4 overflow-hidden bg-glass-bg/70 backdrop-blur-lg border-r border-glow-border">
      <div className="flex items-center mb-10 flex-shrink-0">
        <AppLogoIcon />
        <h2 className={`ml-3 text-2xl font-bold text-white transition-opacity ease-in-out duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>MediFlow</h2>
      </div>
      <nav className="flex-1 overflow-y-auto overflow-x-hidden -mr-2 pr-2">
        <ul>
          {links.map((link) => (
            <li key={link.label} className="relative group">
              <button
                onClick={() => handleClick(link.label)}
                title={isSidebarOpen ? '' : link.label}
                className={`flex items-center w-full p-3 my-1 text-left transition-all duration-300 transform rounded-md ${activeView === {
                  [t('dashboard')]: 'Dashboard',
                  [t('healthRecords')]: 'Health Records',
                  [t('appointments')]: 'Appointments',
                  [t('aiChatbot')]: 'AI Chatbot',
                  [t('migrantSearch')]: 'Migrant Search',
                  [t('userManagement')]: 'User Management',
                  [t('analytics')]: 'Analytics',
                  [t('roadmap')]: 'Roadmap',
              }[link.label] ? 'bg-accent-cyan/20 text-accent-cyan font-bold shadow-lg' : 'text-text-secondary hover:bg-white/10 hover:text-white'} ${!isSidebarOpen && 'justify-center'}`}
                aria-current={activeView === link.label ? 'page' : undefined}
              >
                <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{link.icon}</div>
                <span className={`mx-4 font-medium transition-opacity ease-in-out duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>{link.label}</span>
              </button>
              {!isSidebarOpen && (
                 <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-2 py-1 text-sm bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {link.label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto flex-shrink-0">
        <div className="flex items-center justify-center p-2 rounded-lg bg-black/20">
            <AppLogoIcon />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;