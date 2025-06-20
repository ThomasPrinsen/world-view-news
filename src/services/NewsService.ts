
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  category: 'fire' | 'strike' | 'weather' | 'general';
  distance?: number;
}

export class NewsService {
  static async getLocalNews(lat: number, lon: number, radius: number = 50): Promise<NewsArticle[]> {
    // Simulatie van lokaal nieuws data aangezien we geen echte nieuws API key hebben
    // In een echte implementatie zou je een nieuws API zoals NewsAPI gebruiken
    
    const mockNews: NewsArticle[] = [
      {
        id: '1',
        title: 'Bosbrand',
        description: 'Cisterna di Latina',
        url: '#',
        source: 'Local News',
        publishedAt: new Date().toISOString(),
        category: 'fire'
      },
      {
        id: '2',
        title: 'OV-staking',
        description: 'Rome',
        url: '#',
        source: 'Transport News',
        publishedAt: new Date().toISOString(),
        category: 'strike'
      },
      {
        id: '3',
        title: 'Hoge temperatuur',
        description: 'Midden-Italië',
        url: '#',
        source: 'Weather Service',
        publishedAt: new Date().toISOString(),
        category: 'weather'
      }
    ];

    // Simuleer een API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockNews;
  }
}
