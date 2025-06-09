import React, { useState } from 'react';
import { 
  AlertCircle, 
  RefreshCw, 
  MapPin, 
  Wifi, 
  Key,
  ExternalLink 
} from 'lucide-react';
import { SearchBox } from './SearchBox';
import { LocationSuggestion } from '../types/weather';

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
  onLocationSearch: (lat: number, lon: number) => void;
  onSearch: (query: string) => Promise<LocationSuggestion[]>;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  error,
  onRetry,
  onLocationSearch,
  onSearch,
}) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    await onRetry();
    setIsRetrying(false);
  };

  const getErrorType = () => {
    if (error.includes('API') || error.includes('fetch')) {
      return 'api';
    }
    if (error.includes('Location') || error.includes('denied')) {
      return 'location';
    }
    if (error.includes('Network') || error.includes('connection')) {
      return 'network';
    }
    return 'general';
  };

  const getErrorIcon = () => {
    const errorType = getErrorType();
    switch (errorType) {
      case 'api':
        return <Key className="h-16 w-16 text-red-400" />;
      case 'location':
        return <MapPin className="h-16 w-16 text-yellow-400" />;
      case 'network':
        return <Wifi className="h-16 w-16 text-blue-400" />;
      default:
        return <AlertCircle className="h-16 w-16 text-red-400" />;
    }
  };

  const getErrorTitle = () => {
    const errorType = getErrorType();
    switch (errorType) {
      case 'api':
        return 'API Configuration Required';
      case 'location':
        return 'Location Access Needed';
      case 'network':
        return 'Connection Issue';
      default:
        return 'Weather Data Unavailable';
    }
  };

  const getErrorSuggestions = () => {
    const errorType = getErrorType();
    switch (errorType) {
      case 'api':
        return [
          'Get a free API key from OpenWeatherMap',
          'Add your API key to the weather service configuration',
          'Ensure your API key has proper permissions',
        ];
      case 'location':
        return [
          'Enable location services in your browser',
          'Click "Allow" when prompted for location access',
          'Try searching for your city manually below',
        ];
      case 'network':
        return [
          'Check your internet connection',
          'Try refreshing the page',
          'Disable any ad blockers or VPN that might interfere',
        ];
      default:
        return [
          'Try refreshing the page',
          'Check your internet connection',
          'Search for a specific location',
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-10 -top-10 h-64 w-64 rotate-45 rounded-3xl bg-white/20"></div>
        <div className="absolute -bottom-16 -left-16 h-80 w-80 rotate-12 rounded-full bg-white/10"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-sm text-white shadow-2xl">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            {getErrorIcon()}
          </div>

          {/* Error Title */}
          <h1 className="mb-4 text-center text-3xl font-bold">
            {getErrorTitle()}
          </h1>

          {/* Error Message */}
          <div className="mb-6 rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
            <p className="text-center text-lg">{error}</p>
          </div>

          {/* API Key Setup Instructions */}
          {getErrorType() === 'api' && (
            <div className="mb-6 rounded-2xl bg-blue-500/20 border border-blue-500/30 p-4 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold flex items-center">
                <Key className="mr-2 h-5 w-5" />
                API Key Setup Required
              </h3>
              <p className="mb-3 text-sm opacity-90">
                This app requires an OpenWeatherMap API key to fetch weather data. Follow these steps:
              </p>
              <ol className="mb-4 list-decimal list-inside space-y-2 text-sm">
                <li>Visit OpenWeatherMap and create a free account</li>
                <li>Generate an API key from your dashboard</li>
                <li>Replace the placeholder in the weather service file</li>
              </ol>
              <a
                href="https://openweathermap.org/api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                Get API Key
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}

          {/* Suggestions */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">Try these solutions:</h3>
            <ul className="space-y-2">
              {getErrorSuggestions().map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-white/60"></div>
                  <span className="text-sm opacity-90">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Search Alternative */}
          {getErrorType() === 'location' && (
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold">Search for your location:</h3>
              <SearchBox
                onLocationSelect={onLocationSearch}
                onSearch={onSearch}
                onCurrentLocation={handleRetry}
                loading={isRetrying}
              />
            </div>
          )}

          {/* Retry Button */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex items-center space-x-2 rounded-2xl bg-white/20 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRetrying ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
              <span>{isRetrying ? 'Retrying...' : 'Try Again'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60">
          <p className="text-sm">
            Need help? Check the browser console for more details.
          </p>
        </div>
      </div>
    </div>
  );
};