import React from 'react';
import { AlertTriangle, Flame, Thermometer, MessageCircle } from 'lucide-react';
import { NewsArticle } from '@/services/NewsService';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface NewsPanelProps {
  news: NewsArticle[];
  isLoading: boolean;
  location?: string;
  radius: number;
  onRadiusChange: (radius: number) => void;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ news, isLoading, location, radius, onRadiusChange }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'fire':
        return <Flame className="h-6 w-6 text-red-500" />;
      case 'strike':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'weather':
        return <Thermometer className="h-6 w-6 text-orange-500" />;
      default:
        return <MessageCircle className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Meldingen bij jou in de buurt: 🚨
        </h2>
        {location && (
          <p className="text-sm text-gray-600 mt-1">
            Binnen {radius}km van {location}
          </p>
        )}
      </div>

      <div className='p-6 border-b border-gray-200'>
        <label htmlFor="radius" className="text-sm font-medium text-gray-700">
          Zoekradius ({radius} km)
        </label>
        <Slider
          id="radius"
          min={1}
          max={50}
          step={1}
          value={[radius]}
          onValueChange={(value) => onRadiusChange(value[0])}
          className="mt-2"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : news.length > 0 ? (
          <div className="p-4 space-y-3">
            {news.map((article) => (
              <Card key={article.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-gray-100 p-2">
                    {getIcon(article.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {article.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Geen meldingen gevonden in dit gebied</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full">
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat met een local 💬
        </Button>
      </div>
    </div>
  );
};

export default NewsPanel;
