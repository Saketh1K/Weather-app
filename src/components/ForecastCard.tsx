import React from 'react';
import { DayForecast } from '../types/weather';
import { Droplets, Wind } from 'lucide-react';

interface ForecastCardProps {
  forecast: DayForecast[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      monthDay: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  };

  return (
    <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold text-white">5-Day Forecast</h2>
      
      <div className="space-y-4">
        {forecast.map((day, index) => {
          const { dayName, monthDay } = formatDate(day.date);
          
          return (
            <div
              key={day.date}
              className="group rounded-2xl bg-white/20 p-4 transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-white">
                    <div className="font-semibold">{dayName}</div>
                    <div className="text-sm opacity-75">{monthDay}</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <img
                      src={getWeatherIcon(day.icon)}
                      alt={day.description}
                      className="h-12 w-12 drop-shadow-sm"
                    />
                    <div className="text-white">
                      <div className="text-sm capitalize opacity-90">{day.description}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm opacity-75">
                      <Droplets className="h-4 w-4" />
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm opacity-75">
                      <Wind className="h-4 w-4" />
                      <span>{day.windSpeed}km/h</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold">{day.temp.max}°</div>
                    <div className="text-sm opacity-75">{day.temp.min}°</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};