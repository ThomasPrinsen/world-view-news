
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, isLoading = false }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-orange-500">Yaro</h1>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 w-80">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <Input
                type="text"
                placeholder="Zoek een stad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 w-full"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Inloggen
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
