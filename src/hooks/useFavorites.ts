import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem('nexora-favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexora-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId: number) => {
    return favorites.includes(propertyId);
  };

  return { favorites, toggleFavorite, isFavorite };
}

