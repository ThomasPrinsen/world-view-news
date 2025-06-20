export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  category: 'fire' | 'strike' | 'weather' | 'general';
  distance?: number;
  lat: number;
  lon: number;
}

export class NewsService {
  static async getLocalNews(lat: number, lon: number, radius: number): Promise<NewsArticle[]> {
    // Simulatie van lokaal nieuws data
    const categories: ('fire' | 'strike' | 'weather' | 'general')[] = ['fire', 'strike', 'weather', 'general'];
    const titles: { [key: string]: string[] } = {
        fire: ['Bosbrand', 'Natuurbrand', 'Bermbrand'],
        strike: ['OV-staking', 'Protest', 'Verkeershinder'],
        weather: ['Stormwaarschuwing', 'Hittegolf', 'Gladheid'],
        general: ['Evenement', 'Wegwerkzaamheden', 'Gevonden voorwerp']
    };
    const descriptions: { [key: string]: string[] } = {
        fire: ['Brandweer ter plaatse', 'Rookontwikkeling', 'NL-Alert afgegeven'],
        strike: ['Geen treinen', 'Bussen rijden niet', 'Demonstratie op het plein'],
        weather: ['Code oranje', 'Drink voldoende water', 'Pas op voor ijzel'],
        general: ['Muziekfestival', 'Omleiding ingesteld', 'Kat gevonden']
    };

    const generatedNews: NewsArticle[] = [];
    const numberOfNews = Math.floor(Math.random() * 6); // 0 to 5

    for (let i = 0; i < numberOfNews; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomTitle = titles[randomCategory][Math.floor(Math.random() * titles[randomCategory].length)];
      const randomDescription = descriptions[randomCategory][Math.floor(Math.random() * descriptions[randomCategory].length)];

      // Generate random point within circle
      const r = radius * 1000 * Math.sqrt(Math.random()); // in meters
      const theta = Math.random() * 2 * Math.PI;
      const dy = r * Math.sin(theta);
      const dx = r * Math.cos(theta);

      const newLat = lat + dy / 111320;
      const newLon = lon + dx / (111320 * Math.cos(lat * Math.PI / 180));
      
      generatedNews.push({
        id: `${i + 1}-${Date.now()}`,
        title: randomTitle,
        description: randomDescription,
        url: '#',
        source: 'Local Mock Service',
        publishedAt: new Date().toISOString(),
        category: randomCategory,
        lat: newLat,
        lon: newLon,
      });
    }

    // Simuleer een API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return generatedNews;
  }
}
