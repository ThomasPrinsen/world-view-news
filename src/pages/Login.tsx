
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Wachtwoorden komen niet overeen",
        variant: "destructive",
      });
      return;
    }

    // Simulatie van authenticatie
    if (isLogin) {
      // Login logica
      localStorage.setItem('user', JSON.stringify({ 
        username: formData.username || formData.email,
        email: formData.email 
      }));
      toast({
        title: "Succesvol ingelogd",
        description: `Welkom terug!`,
      });
    } else {
      // Registratie logica
      localStorage.setItem('user', JSON.stringify({ 
        username: formData.username,
        email: formData.email 
      }));
      toast({
        title: "Account aangemaakt",
        description: `Welkom ${formData.username}!`,
      });
    }
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-orange-500">Yaro</h1>
          <h2 className="text-xl font-semibold mt-4">
            {isLogin ? 'Inloggen' : 'Account aanmaken'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="username">Gebruikersnaam</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                required={!isLogin}
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">E-mailadres</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Wachtwoord</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>

          {!isLogin && (
            <div>
              <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
                className="mt-1"
              />
            </div>
          )}

          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
            {isLogin ? 'Inloggen' : 'Account aanmaken'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 hover:text-orange-600 text-sm"
          >
            {isLogin 
              ? 'Nog geen account? Maak er een aan' 
              : 'Al een account? Log in'
            }
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-600 text-sm"
          >
            Terug naar kaart
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
