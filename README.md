# World View News 🌍

Een interactieve nieuwsapplicatie die lokale gebeurtenissen en meldingen toont op een interactieve kaart. Gebruikers kunnen zoeken naar specifieke steden, de zoekradius aanpassen, en real-time meldingen bekijken in hun omgeving.

## ✨ Features

### 🗺️ Interactieve Kaart
- **OpenStreetMap integratie** met Leaflet.js
- **Vloeiende animaties** bij het inzoomen en verplaatsen
- **Klikbare kaart** om nieuwe locaties te selecteren
- **Aanpasbare zoekradius** van 1-50 km met visuele cirkel

### 🔍 Locatie Zoeken
- **Stad zoeken** via de zoekbalk in de header
- **Nominatim API** voor nauwkeurige geocoding
- **Automatische kaart navigatie** naar gevonden locaties
- **Toast notificaties** voor feedback

### 📰 Nieuws & Meldingen
- **Lokale gebeurtenissen** binnen de geselecteerde radius
- **Gecategoriseerde meldingen**:
  - 🔥 **Brand** (rood) - Bosbranden, natuurbranden
  - ⚠️ **Staking** (geel) - OV-stakingen, protesten
  - 🌡️ **Weer** (oranje) - Stormwaarschuwingen, hittegolven
  - 💬 **Algemeen** (blauw) - Evenementen, wegwerkzaamheden
- **Interactieve pins** op de kaart met popup details
- **Real-time updates** bij radius wijzigingen

### 🎨 Moderne UI/UX
- **Responsive design** voor desktop en mobiel
- **Shadcn/ui componenten** voor consistente styling
- **Tailwind CSS** voor moderne styling
- **Smooth animaties** en hover effecten
- **Intuïtieve interface** met duidelijke feedback

## 🚀 Installatie

### Vereisten
- Node.js (versie 18 of hoger)
- npm, yarn, of bun package manager

### Stappen

1. **Clone de repository**
   ```bash
   git clone https://github.com/your-username/world-view-news.git
   cd world-view-news
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   # of
   yarn install
   # of
   bun install
   ```

3. **Start de development server**
   ```bash
   npm run dev
   # of
   yarn dev
   # of
   bun dev
   ```

4. **Open de applicatie**
   - Ga naar `http://localhost:5173` in je browser
   - De applicatie laadt standaard met Rome als startlocatie

## 📖 Gebruik

### Basis Navigatie
1. **Zoeken naar een stad**: Gebruik de zoekbalk bovenaan
2. **Radius aanpassen**: Gebruik de slider in het linkerpaneel
3. **Kaart interactie**: Klik op de kaart om een nieuwe locatie te selecteren
4. **Nieuws bekijken**: Bekijk meldingen in het linkerpaneel of klik op pins op de kaart

### Functies
- **Zoekbalk**: Type een stadnaam en druk op Enter
- **Radius slider**: Pas de zoekradius aan van 1-50 km
- **Kaart pins**: Klik op gekleurde pins voor meer details
- **Popup details**: Bekijk titel en beschrijving van meldingen

## 🏗️ Project Structuur

```
world-view-news/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Zoekbalk en navigatie
│   │   ├── MapComponent.tsx    # Interactieve kaart
│   │   ├── NewsPanel.tsx       # Nieuws paneel met slider
│   │   └── ui/                 # Shadcn/ui componenten
│   ├── pages/
│   │   ├── Index.tsx           # Hoofdpagina
│   │   ├── Login.tsx           # Login pagina
│   │   └── NotFound.tsx        # 404 pagina
│   ├── services/
│   │   ├── LocationService.ts  # Geocoding API
│   │   └── NewsService.ts      # Nieuws data simulatie
│   ├── hooks/
│   │   └── use-toast.ts        # Toast notificaties
│   └── lib/
│       └── utils.ts            # Utility functies
├── public/                     # Statische assets
└── package.json               # Dependencies en scripts
```

## 🔧 Technische Details

### Frontend Stack
- **React 18** met TypeScript
- **Vite** voor snelle development en build
- **Tailwind CSS** voor styling
- **Shadcn/ui** voor UI componenten
- **Lucide React** voor iconen

### Kaart & Locatie
- **Leaflet.js** voor interactieve kaarten
- **OpenStreetMap** voor kaart tiles
- **Nominatim API** voor geocoding
- **Custom markers** met SVG iconen

### State Management
- **React Hooks** (useState, useEffect, useCallback)
- **Local state** voor component data
- **Props drilling** voor data flow

### API Integratie
- **Nominatim** voor locatie zoeken
- **Mock data** voor nieuws (simulatie)
- **Error handling** met toast notificaties

## 🎨 Customization

### Nieuwe Nieuws Categorieën
Voeg nieuwe categorieën toe in `src/services/NewsService.ts`:

```typescript
const categories = ['fire', 'strike', 'weather', 'general', 'new-category'];
```

### Kaart Styling
Pas de kaart aan in `src/components/MapComponent.tsx`:

```typescript
// Verander kaart tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
})
```

### Icon Kleuren
Wijzig kleuren in `src/components/MapComponent.tsx`:

```typescript
const getIconInfo = (category: string) => {
  switch (category) {
    case 'fire':
      return { svg: '...', color: '#your-color' };
    // ...
  }
};
```

## 🚀 Deployment

### Build voor Productie
```bash
npm run build
# of
yarn build
# of
bun build
```

### Deploy naar Vercel
1. Push code naar GitHub
2. Verbind repository met Vercel
3. Deploy automatisch

### Deploy naar Netlify
1. Build de applicatie
2. Upload `dist/` folder naar Netlify
3. Configure environment variables

## 🔮 Toekomstplannen

### 🔹 Technische realisatie
👉 Experts kunnen de prototypekaart uitwerken met:

- **Real-time koppeling** aan betrouwbare data feeds (bijv. EMSC, lokale verkeers- of rampendiensten).
- **Mobielvriendelijke implementatie** met caching voor offline gebruik.

### 🔹 Validatie en gebruikerstests
👉 Organiseer:

- **Grootschaligere tests** met reizigers in diverse contexten (luchthaven, trein, thuis).
- **Toegankelijkheidstests**: screenreader-compatibiliteit, kleurenblindheid, taalopties.

### 🔹 Data en ethiek
👉 Stel heldere richtlijnen op voor:

- **Gegevensbescherming** (geen tracking buiten noodzakelijke functies).
- **Transparantie over databronnen** (waar komen de meldingen vandaan?).

### 🔹 Contentbeheer
👉 Ontwikkel een model voor:

- **Automatische data-inname** uit betrouwbare bronnen.
- **Handmatige kwaliteitscontrole** waar nodig (bijvoorbeeld bij nieuwe regio's of onbekende meldingen).

## 🔍 Troubleshooting

### Veelvoorkomende Problemen

**Kaart laadt niet**
- Controleer internetverbinding
- Verifieer OpenStreetMap toegang

**Zoeken werkt niet**
- Controleer Nominatim API status
- Verifieer CORS instellingen

**Pins verschijnen niet**
- Controleer console voor errors
- Verifieer news data structuur

**Styling problemen**
- Controleer Tailwind CSS configuratie
- Verifieer shadcn/ui installatie

## 🤝 Bijdragen

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je wijzigingen (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📝 Licentie

Dit project is gelicenseerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 🙏 Credits

- **OpenStreetMap** voor kaart data
- **Nominatim** voor geocoding services
- **Leaflet.js** voor kaart functionaliteit
- **Shadcn/ui** voor UI componenten
- **Lucide** voor iconen

## 📞 Contact

Voor vragen of ondersteuning:
- GitHub Issues: [Project Issues](https://github.com/your-username/world-view-news/issues)
- Email: thomas05.prinsen@gmail.com
