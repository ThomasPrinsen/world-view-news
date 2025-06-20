
export interface LocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export class LocationService {
  private static readonly API_URL = 'https://api.openstreetmap.org/search';

  static async searchLocation(query: string): Promise<LocationData[]> {
    try {
      const response = await fetch(
        `${this.API_URL}?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const data = await response.json();
      
      return data.map((item: any) => ({
        name: item.display_name.split(',')[0],
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        country: item.address?.country || '',
        state: item.address?.state || ''
      }));
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  }
}
