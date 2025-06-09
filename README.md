# Weather Prediction App

A modern, responsive weather forecast application built with React, TypeScript, Vite, and Tailwind CSS. Get accurate current weather and 5-day forecasts for any location worldwide, with beautiful UI and smooth user experience.
live demo:https://starlit-sunburst-175e83.netlify.app/
## Features

- 🌍 **Global Search**: Search for any city and get instant weather updates.
- 📍 **Current Location**: Fetch weather using your device's geolocation.
- 🌦️ **Current Weather**: View temperature, humidity, wind, pressure, visibility, and more.
- 📅 **5-Day Forecast**: See daily forecasts with temperature, humidity, wind, and weather icons.
- 🎨 **Dynamic UI**: Background gradients and visuals adapt to weather and time of day.
- ⚡ **Fast & Responsive**: Built with Vite, React, and Tailwind CSS for instant feedback.
- 🗃️ **Caching**: Weather data is cached for 10 minutes to reduce API calls and improve speed.
- 🛠️ **TypeScript**: Fully typed codebase for reliability and maintainability.

## Screenshots

> _Add screenshots here if available._

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your OpenWeatherMap API key:**
   - Register for a free API key at [OpenWeatherMap](https://openweathermap.org/api).
   - Create a `.env` file in the project root and add:
     ```env
     VITE_OPENWEATHER_API_KEY=your_api_key_here
     ```
   - _Note: The current codebase has the API key hardcoded in `src/services/weatherService.ts`. For production, move it to the `.env` file and update the code to use `import.meta.env.VITE_OPENWEATHER_API_KEY`._

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
```
The production-ready files will be in the `dist/` directory.

### Linting

```bash
npm run lint
```

## Deployment

### Deploying to Netlify

1. **Install Netlify CLI (optional):**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy using one of these methods:**

   **Method 1 - Using Netlify CLI:**
   ```bash
   netlify deploy
   ```
   Follow the prompts to log in and deploy your site.

   **Method 2 - Using Netlify UI:**
   - Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
   - Go to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add your environment variables in Netlify's site settings:
     - Go to Site settings > Build & deploy > Environment
     - Add `VITE_OPENWEATHER_API_KEY` with your API key

4. **Set up environment variables:**
   - In Netlify's dashboard, go to Site settings > Build & deploy > Environment
   - Add your OpenWeatherMap API key as `VITE_OPENWEATHER_API_KEY`

## Usage

- Use the search bar to find weather for any city.
- Click the location icon to use your current location.
- View current weather and 5-day forecast with detailed metrics.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Customization

- **Styling:** Tailwind CSS is used for all styling. Edit `tailwind.config.js` and `src/index.css` for custom themes.
- **API Key:** For security, always use environment variables for API keys in production.

## Folder Structure

```
├── src/
│   ├── components/      # React components (WeatherCard, ForecastCard, SearchBox, etc.)
│   ├── hooks/           # Custom React hooks (useWeather)
│   ├── services/        # API service logic (weatherService)
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind CSS imports
├── public/
├── dist/                # Production build output
├── package.json         # Project metadata and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── .env                 # (Not committed) API keys and environment variables
```

---
