import React, { useState } from 'react';
import { MigrantProfile } from '../../../types';
import Card from '../../common/Card';
import { useData } from '../../../contexts/DataContext';

interface MigrantSearchPageProps {
  onSelectMigrant: (migrant: MigrantProfile) => void;
}

const MigrantSearchPage: React.FC<MigrantSearchPageProps> = ({ onSelectMigrant }) => {
  const { migrants } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<MigrantProfile[]>(migrants);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (searchTerm.trim() === '') {
      setResults(migrants); // Show all if search is empty
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      setResults(
        migrants.filter(
          m =>
            m.name.toLowerCase().includes(lowercasedTerm) ||
            m.id.toLowerCase().includes(lowercasedTerm) ||
            m.phone.includes(searchTerm)
        )
      );
    }
  };
  
  const currentList = searched ? results : migrants;

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={handleSearch}>
          <label htmlFor="search-input" className="text-lg font-semibold text-white">
            Find a Migrant's Record
          </label>
          <div className="relative flex mt-2">
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, or ID..."
              className="w-full p-3 text-text-primary bg-brand-bg/80 border border-glow-border rounded-l-lg pl-10 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
             <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-5 h-5 mt-3.5 ml-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <button
              type="submit"
              className="px-6 py-3 font-semibold text-white rounded-r-lg bg-accent-cyan/80 hover:bg-accent-cyan transition-colors focus:outline-none btn-pulse"
            >
              Search
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-white">
          {searched ? `Search Results (${results.length})` : 'All Migrant Records'}
        </h3>
        {searched && results.length === 0 ? (
          <p className="py-6 text-center text-text-secondary">No records found matching your search.</p>
        ) : (
          <ul className="space-y-4">
            {currentList.map((migrant, index) => (
              <li key={migrant.id} className="flex items-center justify-between p-4 transition-all duration-300 bg-black/20 rounded-lg hover:bg-white/10 hover:scale-[1.02] slide-in-up-content" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="flex items-center">
                  <img src={migrant.avatarUrl} alt={migrant.name} className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <p className="font-semibold text-text-primary">{migrant.name}</p>
                    <p className="text-sm text-text-secondary">ID: {migrant.id} | Phone: {migrant.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectMigrant(migrant)}
                  className="px-4 py-2 text-sm font-medium text-white rounded-md bg-accent-cyan/80 hover:bg-accent-cyan transition-colors btn-pulse"
                >
                  View Profile
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default MigrantSearchPage;