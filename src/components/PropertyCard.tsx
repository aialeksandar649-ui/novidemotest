import { Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Property } from '../types';
import { useFavorites } from '../hooks/useFavorites';

interface PropertyCardProps extends Property {
  id: number;
}

export default function PropertyCard({ id, imageUrl, images, location, title, price, rating }: PropertyCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);

  // Prioritize images array, then imageUrl, with fallback
  const displayImage = (images && images.length > 0) ? images[0] : (imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80');

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div 
      className="group cursor-pointer flex flex-col h-full animate-fade-in hover-lift"
      onClick={() => navigate(`/property/${id}`)}
    >
      {/* Property Image Container */}
      <div className="relative w-full aspect-[4/3] mb-3 rounded-lg overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              favorite 
                ? 'fill-[#FF385C] text-[#FF385C]' 
                : 'text-gray-700 dark:text-gray-300'
            }`} 
          />
        </button>
      </div>

      {/* Property Info - Fixed Height */}
      <div className="flex flex-col flex-1 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-[15px] leading-tight truncate">
              {location}
            </h3>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-3.5 w-3.5 fill-black dark:fill-white text-black dark:text-white" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{rating}</span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-[15px] line-clamp-2 min-h-[2.5rem]">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-auto">
          <span className="font-semibold text-gray-900 dark:text-gray-100">${price}</span>
          <span className="text-gray-500 dark:text-gray-400"> night</span>
        </p>
      </div>
    </div>
  );
}
