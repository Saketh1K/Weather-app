import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Compass,
  Sun
} from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getBackgroundGradient = (condition: string, temp: number) => {
    const time = new Date().getHours();
    const isNight = time < 6 || time > 20;
    
    if (isNight) {
      return 'from-slate-900 via-purple-900 to-slate-900';
    }
    
    switch (condition.toLowerCase()) {
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

  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
  };

  const formatWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getBackgroundGradient(weather.current.condition, weather.current.temp)} p-8 text-white shadow-2xl backdrop-blur-sm`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-4 -top-4 h-32 w-32 rotate-45 rounded-2xl bg-white/20"></div>
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rotate-12 rounded-full bg-white/10"></div>
      </div>

      <div className="relative z-10">
        {/* Location and Time */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{weather.location.name}</h1>
          <p className="text-lg opacity-90">{weather.location.country}</p>
          <p className="text-sm opacity-75">
            {new Date(weather.current.timestamp * 1000).toLocaleString()}
          </p>
        </div>

        {/* Main Weather Display */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-6xl font-light">{weather.current.temp}°</div>
            <div className="text-xl capitalize opacity-90">{weather.current.description}</div>
            <div className="text-sm opacity-75">Feels like {weather.current.feelsLike}°</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={getWeatherIcon(weather.current.icon)}
              alt={weather.current.description}
              className="h-24 w-24 drop-shadow-lg"
            />
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5" />
              <span className="text-sm opacity-90">Humidity</span>
            </div>
            <div className="text-2xl font-semibold">{weather.current.humidity}%</div>
          </div>

          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5" />
              <span className="text-sm opacity-90">Wind</span>
            </div>
            <div className="text-2xl font-semibold">{weather.current.windSpeed} km/h</div>
            <div className="text-xs opacity-75">{formatWindDirection(weather.current.windDirection)}</div>
          </div>

          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Gauge className="h-5 w-5" />
              <span className="text-sm opacity-90">Pressure</span>
            </div>
            <div className="text-2xl font-semibold">{weather.current.pressure}</div>
            <div className="text-xs opacity-75">hPa</div>
          </div>

          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span className="text-sm opacity-90">Visibility</span>
            </div>
            <div className="text-2xl font-semibold">{weather.current.visibility}</div>
            <div className="text-xs opacity-75">km</div>
          </div>
        </div>
      </div>
    </div>
  );
};