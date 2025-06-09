import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../services/weatherService';
import { WeatherData, LocationSuggestion } from '../types/weather';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  const transformWeatherData = (current: any, forecast: any, location: any): WeatherData => {
    const forecastDays = forecast.list
      .filter((_: any, index: number) => index % 8 === 0)
      .slice(1, 6)
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toISOString().split('T')[0],
        temp: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
        },
        condition: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
        precipitation: item.rain?.['3h'] || item.snow?.['3h'] || 0,
      }));

    return {
      location: {
        name: location?.name || current.name,
        country: location?.country || current.sys.country,
        lat: current.coord.lat,
        lon: current.coord.lon,
      },
      current: {
        temp: Math.round(current.main.temp),
        feelsLike: Math.round(current.main.feels_like),
        humidity: current.main.humidity,
        pressure: current.main.pressure,
        windSpeed: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
        windDirection: current.wind.deg,
        visibility: Math.round(current.visibility / 1000), // Convert m to km
        uvIndex: 0, // UV index not available in current API response
        condition: current.weather[0].main,
        description: current.weather[0].description,
        icon: current.weather[0].icon,
        timestamp: current.dt,
      },
      forecast: forecastDays,
    };
  };

  const fetchWeatherForLocation = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const [currentWeather, forecastWeather, locationInfo] = await Promise.all([
        weatherService.getCurrentWeather(lat, lon),
        weatherService.getForecast(lat, lon),
        weatherService.reverseGeocode(lat, lon),
      ]);

      const transformedData = transformWeatherData(currentWeather, forecastWeather, locationInfo);
      setWeatherData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentLocationWeather = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 600000, // 10 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPermission('granted');
        fetchWeatherForLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        setLocationPermission('denied');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location services.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred while retrieving location.');
            break;
        }
      },
      options
    );
  }, [fetchWeatherForLocation]);

  const searchLocation = useCallback(async (query: string): Promise<LocationSuggestion[]> => {
    try {
      const results = await weatherService.searchLocations(query);
      return results.map((result: any) => ({
        name: result.name,
        country: result.country,
        state: result.state,
        lat: result.lat,
        lon: result.lon,
      }));
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    getCurrentLocationWeather();
  }, [getCurrentLocationWeather]);

  return {
    weatherData,
    loading,
    error,
    locationPermission,
    fetchWeatherForLocation,
    getCurrentLocationWeather,
    searchLocation,
  };
};