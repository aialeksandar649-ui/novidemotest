import { useState, useMemo } from 'react';
import { MapPin, X } from 'lucide-react';
import { Property } from '../types';

interface MapViewProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertyClick?: (property: Property, index: number) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

// Simple coordinate generator based on location string
const getCoordinates = (location: string): { lat: number; lng: number } => {
  // Generate consistent coordinates based on location string hash
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = location.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Balkans region approximate bounds
  const minLat = 41.0;
  const maxLat = 47.0;
  const minLng = 13.0;
  const maxLng = 23.0;
  
  const lat = minLat + (Math.abs(hash) % 1000) / 1000 * (maxLat - minLat);
  const lng = minLng + (Math.abs(hash * 7) % 1000) / 1000 * (maxLng - minLng);
  
  return { lat, lng };
};

export default function MapView({ 
  properties, 
  selectedProperty, 
  onPropertyClick,
  center,
  zoom = 6
}: MapViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const propertiesWithCoords = useMemo(() => {
    return properties.map((property, index) => ({
      ...property,
      index,
      coordinates: getCoordinates(property.location)
    }));
  }, [properties]);

  const mapCenter = center || (propertiesWithCoords.length > 0 
    ? propertiesWithCoords[0].coordinates 
    : { lat: 44.0, lng: 18.0 });

  return (
    <div className={`relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[500px] md:h-[600px]'}`} role="application" aria-label="Property map">
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Exit fullscreen"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      
      {!isFullscreen && (
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium min-h-[44px]"
          aria-label="View fullscreen map"
        >
          Fullscreen
        </button>
      )}

      {/* Map Container */}
      <div className="relative w-full h-full">
        {/* Fallback: Simple coordinate-based visualization */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 relative overflow-hidden">
          {/* Grid overlay for map-like appearance */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} aria-hidden="true" />
          
          {/* Property markers */}
          {propertiesWithCoords.map((property) => {
            // Normalize coordinates to container dimensions
            const x = ((property.coordinates.lng - 13) / 10) * 100;
            const y = ((47 - property.coordinates.lat) / 6) * 100;
            const isSelected = selectedProperty?.title === property.title && 
                              selectedProperty?.location === property.location;
            
            return (
              <button
                key={`${property.title}-${property.location}-${property.index}`}
                onClick={() => onPropertyClick?.(property, property.index)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                }`}
                style={{
                  left: `${Math.max(5, Math.min(95, x))}%`,
                  top: `${Math.max(5, Math.min(95, y))}%`,
                }}
                title={`${property.title} - ${property.location}`}
                aria-label={`${property.title} in ${property.location}, $${property.price} per night`}
              >
                <div className={`relative ${isSelected ? 'animate-pulse' : ''}`}>
                  <MapPin className={`h-8 w-8 ${
                    isSelected 
                      ? 'text-[#FF385C] fill-[#FF385C]' 
                      : 'text-[#FF385C] fill-white dark:fill-gray-800'
                  } drop-shadow-lg`} aria-hidden="true" />
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#FF385C] rounded-full border-2 border-white dark:border-gray-800" aria-hidden="true" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Property list overlay (mobile) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 max-h-[200px] overflow-y-auto md:hidden" role="list" aria-label="Property list">
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'}
        </div>
        <div className="space-y-2">
          {propertiesWithCoords.slice(0, 3).map((property) => (
            <button
              key={`list-${property.index}`}
              onClick={() => onPropertyClick?.(property, property.index)}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px]"
              role="listitem"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {property.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {property.location}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
