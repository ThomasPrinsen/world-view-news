
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import MapComponent from '@/components/MapComponent';
import NewsPanel from '@/components/NewsPanel';
import { LocationService, LocationData } from '@/services/LocationService';
import { NewsService, NewsArticle } from '@/services/NewsService';

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationData>({
    name: 'Rome',
    lat: 41.9028,
    lon: 12.4964,
    country: 'Italy'
  });
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const { toast } = useToast();

  const loadNewsForLocation = useCallback(async (lat: number, lon: number) => {
    setIsLoadingNews(true);
    try {
      const localNews = await NewsService.getLocalNews(lat, lon, 50);
      setNews(localNews);
    } catch (error) {
      console.error('Error loading news:', error);
      toast({
        title: "Fout bij laden nieuws",
        description: "Kon het nieuws niet laden voor deze locatie.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingNews(false);
    }
  }, [toast]);

  const handleSearch = async (cityName: string) => {
    setIsSearching(true);
    try {
      const locations = await LocationService.searchLocation(cityName);
      
      if (locations.length > 0) {
        const newLocation = locations[0];
        setCurrentLocation(newLocation);
        await loadNewsForLocation(newLocation.lat, newLocation.lon);
        
        toast({
          title: "Locatie gevonden",
          description: `Ingezoomd op ${newLocation.name}`,
        });
      } else {
        toast({
          title: "Geen resultaten",
          description: "Geen locatie gevonden voor deze zoekopdracht.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Zoekfout",
        description: "Er ging iets mis bij het zoeken naar de locatie.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleMapClick = async (lat: number, lon: number) => {
    setCurrentLocation(prev => ({
      ...prev,
      lat,
      lon,
      name: `${lat.toFixed(4)}, ${lon.toFixed(4)}`
    }));
    await loadNewsForLocation(lat, lon);
  };

  // Laad initieel nieuws voor Rome
  React.useEffect(() => {
    loadNewsForLocation(currentLocation.lat, currentLocation.lon);
  }, [loadNewsForLocation, currentLocation.lat, currentLocation.lon]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearch={handleSearch} isLoading={isSearching} />
      
      <div className="flex-1 flex">
        {/* Nieuws panel links */}
        <div className="w-80 bg-white shadow-lg">
          <NewsPanel 
            news={news} 
            isLoading={isLoadingNews}
            location={currentLocation.name}
          />
        </div>
        
        {/* Kaart rechts */}
        <div className="flex-1 p-4">
          <div className="h-full rounded-lg overflow-hidden shadow-lg">
            <MapComponent
              lat={currentLocation.lat}
              lon={currentLocation.lon}
              zoom={10}
              onLocationSelect={handleMapClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
