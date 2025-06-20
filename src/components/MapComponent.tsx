import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NewsArticle } from '@/services/NewsService';
import { renderToStaticMarkup } from 'react-dom/server';
import { Flame, AlertTriangle, Thermometer, MessageCircle } from 'lucide-react';

// Fix voor Leaflet default markers in bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  lat?: number;
  lon?: number;
  zoom?: number;
  radius?: number; // in km
  news?: NewsArticle[];
  onLocationSelect?: (lat: number, lon: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  lat = 51.505, 
  lon = -0.09, 
  zoom = 13,
  radius = 50,
  news = [],
  onLocationSelect 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const newsMarkersRef = useRef<L.LayerGroup | null>(null);

  const getIconInfo = (category: string) => {
    // Raw SVGs from Lucide icons, adapted for direct use to ensure they render correctly.
    const icons = {
      fire: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
        color: '#ef4444' // red-500
      },
      strike: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
        color: '#f59e0b' // yellow-500
      },
      weather: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>`,
        color: '#f97316' // orange-500
      },
      general: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`,
        color: '#3b82f6' // blue-500
      }
    };

    switch (category) {
      case 'fire':
        return icons.fire;
      case 'strike':
        return icons.strike;
      case 'weather':
        return icons.weather;
      default:
        return icons.general;
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lon], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Add click handler
      mapInstanceRef.current.on('click', (e) => {
        const { lat, lng } = e.latlng;
        if (onLocationSelect) {
          onLocationSelect(lat, lng);
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lon], zoom);
      
      // Remove existing marker and circle
      if (markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current);
      }
      if (circleRef.current) {
        mapInstanceRef.current.removeLayer(circleRef.current);
      }
      
      // Add new marker
      markerRef.current = L.marker([lat, lon]).addTo(mapInstanceRef.current);
      
      // Add radius circle
      circleRef.current = L.circle([lat, lon], {
        radius: radius * 1000, // convert km to meters
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        color: '#3b82f6',
        weight: 2
      }).addTo(mapInstanceRef.current);
    }
  }, [lat, lon, zoom, radius]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing news markers
    if (newsMarkersRef.current) {
      newsMarkersRef.current.clearLayers();
    } else {
      newsMarkersRef.current = L.layerGroup().addTo(mapInstanceRef.current);
    }

    // Add new news markers
    news.forEach(article => {
      const { svg, color } = getIconInfo(article.category);
      
      const iconHtml = `
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: ${color};
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.4);
        ">
          ${svg}
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: '', // Prevents default leaflet styles
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker([article.lat, article.lon], { icon: customIcon })
        .addTo(newsMarkersRef.current!)
        .bindPopup(`<b>${article.title}</b><br>${article.description}`);
    });
  }, [news]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default MapComponent;
