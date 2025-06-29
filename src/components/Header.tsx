
import React, { useState, useEffect } from 'react';
import { Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

interface User {
  username: string;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, isLoading = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      toast({
        title: "Zoeken...",
        description: `Zoeken naar "${searchQuery}"`,
      });
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Uitgelogd",
      description: "Je bent succesvol uitgelogd",
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-orange-500 cursor-pointer" onClick={() => navigate('/')}>
            TripAlert
          </h1>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 w-80 border border-gray-200 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <Input
                type="text"
                placeholder="Zoek een stad (bijv. Rome, Amsterdam, New York)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 w-full"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">
                Welkom, {user.username}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Uitloggen</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogin}
              className="text-gray-700 hover:text-orange-500"
            >
              Inloggen
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
