import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '../types';
import { properties as initialProperties } from '../data/properties';

interface PropertiesContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('nexora-properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProperties;
      }
    }
    return initialProperties;
  });

  useEffect(() => {
    localStorage.setItem('nexora-properties', JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property: Property) => {
    setProperties(prev => [...prev, property]);
  };

  return (
    <PropertiesContext.Provider value={{ properties, addProperty }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
}
