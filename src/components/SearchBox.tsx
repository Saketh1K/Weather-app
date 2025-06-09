import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { LocationSuggestion } from '../types/weather';

interface SearchBoxProps {
  onLocationSelect: (lat: number, lon: number) => void;
  onSearch: (query: string) => Promise<LocationSuggestion[]>;
  onCurrentLocation: () => void;
  loading?: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onLocationSelect,
  onSearch,
  onCurrentLocation,
  loading = false,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (value: string) => {
    setQuery(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await onSearch(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleLocationSelect = (suggestion: LocationSuggestion) => {
    setQuery(`${suggestion.name}, ${suggestion.country}`);
    setShowSuggestions(false);
    setSuggestions([]);
    onLocationSelect(suggestion.lat, suggestion.lon);
  };

  return (
    <div ref={searchRef} className="relative mb-8">
      <div className="flex space-x-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search for any city..."
              className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 focus:border-white/40 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            {isLoading && (
              <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-white" />
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full z-50 mt-2 w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.lat}-${suggestion.lon}`}
                  onClick={() => handleLocationSelect(suggestion)}
                  className="flex w-full items-center space-x-3 px-4 py-3 text-left text-white transition-colors hover:bg-white/20 first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <MapPin className="h-4 w-4 text-gray-300" />
                  <div>
                    <div className="font-medium">{suggestion.name}</div>
                    <div className="text-sm text-gray-300">
                      {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Location Button */}
        <button
          onClick={onCurrentLocation}
          disabled={loading}
          className="flex items-center justify-center rounded-2xl bg-white/20 px-6 py-4 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Use current location"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <MapPin className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};