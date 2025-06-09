import React from 'react';
import { useWeather } from './hooks/useWeather';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SearchBox } from './components/SearchBox';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorScreen } from './components/ErrorScreen';

function App() {
  const {
    weatherData,
    loading,
    error,
    locationPermission,
    fetchWeatherForLocation,
    getCurrentLocationWeather,
    searchLocation,
  } = useWeather();

  // Show loading screen on initial load
  if (loading && !weatherData) {
    return <LoadingScreen />;
  }

  // Show error screen if there's an error and no cached data
  if (error && !weatherData) {
    return (
      <ErrorScreen 
        error={error} 
        onRetry={getCurrentLocationWeather}
        onLocationSearch={fetchWeatherForLocation}
        onSearch={searchLocation}
      />
    );
  }

  // Get background gradient based on current weather
  const getBackgroundGradient = () => {
    if (!weatherData) {
      return 'from-blue-400 via-purple-500 to-pink-500';
    }

    const condition = weatherData.current.condition.toLowerCase();
    const temp = weatherData.current.temp;
    const time = new Date().getHours();
    const isNight = time < 6 || time > 20;
    
    if (isNight) {
      return 'from-slate-900 via-purple-900 to-slate-900';
    }
    
    switch (condition) {
      case 'clear':
        return temp > 25 
          ? 'from-orange-400 via-yellow-400 to-orange-500'
          : 'from-blue-400 via-sky-400 to-blue-500';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
        return 'from-slate-600 via-slate-700 to-slate-800';
      case 'snow':
        return 'from-slate-200 via-slate-300 to-slate-400';
      case 'thunderstorm':
        return 'from-slate-800 via-slate-900 to-black';
      default:
        return 'from-blue-400 via-sky-400 to-blue-500';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-10 -top-10 h-64 w-64 rotate-45 rounded-3xl bg-white/20"></div>
        <div className="absolute -bottom-16 -left-16 h-80 w-80 rotate-12 rounded-full bg-white/10"></div>
        <div className="absolute right-1/4 top-1/4 h-32 w-32 rotate-45 rounded-2xl bg-white/15"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
            Weather Forecast
          </h1>
          <p className="text-lg text-white/80">
            Get accurate weather predictions for any location worldwide
          </p>
        </div>

        {/* Search Box */}
        <SearchBox
          onLocationSelect={fetchWeatherForLocation}
          onSearch={searchLocation}
          onCurrentLocation={getCurrentLocationWeather}
          loading={loading}
        />

        {/* Error Banner (if error but have cached data) */}
        {error && weatherData && (
          <div className="mb-6 rounded-2xl bg-red-500/20 border border-red-500/30 p-4 text-white backdrop-blur-sm">
            <p className="text-sm">
              <strong>Note:</strong> {error}. Showing cached data.
            </p>
          </div>
        )}

        {/* Weather Content */}
        {weatherData && (
          <div className="space-y-8">
            {/* Current Weather */}
            <div className="transform transition-all duration-500 hover:scale-[1.02]">
              <WeatherCard weather={weatherData} />
            </div>

            {/* 5-Day Forecast */}
            <div className="transform transition-all duration-500 hover:scale-[1.01]">
              <ForecastCard forecast={weatherData.forecast} />
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && weatherData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="rounded-2xl bg-white/10 p-6 text-center text-white backdrop-blur-md">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white mx-auto"></div>
              <p>Updating weather data...</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-white/60">
          
        </footer>
      </div>
    </div>
  );
}

export default App;