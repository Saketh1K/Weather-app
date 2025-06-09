import React from 'react';
import { Loader2, Cloud, Sun, CloudRain } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="text-center text-white">
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-4">
            <Sun className="h-12 w-12 animate-spin text-yellow-300" />
            <Cloud className="h-16 w-16 animate-bounce text-white" />
            <CloudRain className="h-12 w-12 animate-pulse text-blue-200" />
          </div>
        </div>
        
        <div className="mb-4 flex items-center justify-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-2xl font-semibold">Loading Weather Data</span>
        </div>
        
        <p className="max-w-md text-lg opacity-90">
          Fetching the latest weather information for your location...
        </p>
      </div>
    </div>
  );
};