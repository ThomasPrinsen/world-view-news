
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  onLocationSelect?: (lat: number, lon: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  lat = 51.505, 
  lon = -0.09, 
  zoom = 13,
  onLocationSelect 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

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
      mapInstanceRef.current.setView([lat, lon], zoom);
      
      // Remove existing marker
      if (markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current);
      }
      
      // Add new marker
      markerRef.current = L.marker([lat, lon]).addTo(mapInstanceRef.current);
      
      // Add radius circle (50km)
      L.circle([lat, lon], {
        radius: 50000, // 50km in meters
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        color: '#3b82f6',
        weight: 2
      }).addTo(mapInstanceRef.current);
    }
  }, [lat, lon, zoom]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default MapComponent;
