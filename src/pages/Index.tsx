import React, { useState, useCallback, useEffect } from 'react';
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
  const [radius, setRadius] = useState(50); // Standaard 50km
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const { toast } = useToast();

  const loadNewsForLocation = useCallback(async (lat: number, lon: number, searchRadius: number) => {
    setIsLoadingNews(true);
    try {
      console.log(`Loading news for coordinates: ${lat}, ${lon} with radius ${searchRadius}km`);
      const localNews = await NewsService.getLocalNews(lat, lon, searchRadius);
      setNews(localNews);
      console.log(`Loaded ${localNews.length} news articles`);
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
    console.log(`Searching for city: ${cityName}`);
    
    try {
      const locations = await LocationService.searchLocation(cityName);
      console.log(`Found ${locations.length} locations for "${cityName}"`);
      
      if (locations.length > 0) {
        const newLocation = locations[0];
        console.log(`Setting location to:`, newLocation);
        
        setCurrentLocation(newLocation);
        await loadNewsForLocation(newLocation.lat, newLocation.lon, radius);
        
        toast({
          title: "Locatie gevonden",
          description: `Ingezoomd op ${newLocation.name}`,
        });
      } else {
        toast({
          title: "Geen resultaten",
          description: `Geen locatie gevonden voor "${cityName}". Probeer een andere naam.`,
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
    console.log(`Map clicked at: ${lat}, ${lon}`);
    
    const newLocation: LocationData = {
      name: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
      lat,
      lon,
      country: 'Unknown'
    };
    
    setCurrentLocation(newLocation);
    await loadNewsForLocation(lat, lon, radius);
    
    toast({
      title: "Nieuwe locatie geselecteerd",
      description: `Coördinaten: ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
    });
  };

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    loadNewsForLocation(currentLocation.lat, currentLocation.lon, newRadius);
  };

  // Laad initieel nieuws voor Rome
  useEffect(() => {
    console.log('Loading initial news for Rome');
    loadNewsForLocation(currentLocation.lat, currentLocation.lon, radius);
  }, []); // Only run on mount

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
            radius={radius}
            onRadiusChange={handleRadiusChange}
          />
        </div>
        
        {/* Kaart rechts */}
        <div className="flex-1 p-4">
          <div className="h-full rounded-lg overflow-hidden shadow-lg">
            <MapComponent
              lat={currentLocation.lat}
              lon={currentLocation.lon}
              zoom={10}
              radius={radius}
              news={news}
              onLocationSelect={handleMapClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
