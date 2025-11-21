import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Categories from '../components/Categories';
import PropertyCard from '../components/PropertyCard';
import Filters, { FilterState } from '../components/Filters';
import SkeletonCard from '../components/SkeletonCard';
import { useLanguage } from '../contexts/LanguageContext';
import { Property } from '../types';

// Funkcija za dobijanje prevedenog naziva kategorije
const getCategoryLabel = (originalKey: string, t: (key: string) => string): string => {
  const categoryMap: Record<string, string> = {
    'Mansions': 'mansions',
    'Cabins': 'cabins',
    'Beach': 'beach',
    'Mountains': 'mountains',
    'City': 'city',
    'Lofts': 'lofts',
    'Countryside': 'countryside',
    'Camping': 'camping',
  };
  const key = categoryMap[originalKey];
  return key ? t(key) : originalKey;
};

interface HomeProps {
  properties: Property[];
}

export default function Home({ properties }: HomeProps) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    bedrooms: null,
    beds: null,
    bathrooms: null,
    guests: null,
    amenities: [],
    sortBy: 'popular'
  });
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, filters]);

  const filteredProperties = useMemo(() => {
    let filtered = properties;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.location.toLowerCase().includes(query) ||
          property.title.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.category.some(cat => cat.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((property) =>
        property.category.includes(selectedCategory)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (property) =>
        property.price >= filters.priceRange[0] &&
        property.price <= filters.priceRange[1]
    );

    // Bedrooms filter
    if (filters.bedrooms !== null) {
      filtered = filtered.filter((property) => property.bedrooms >= filters.bedrooms!);
    }

    // Beds filter
    if (filters.beds !== null) {
      filtered = filtered.filter((property) => property.beds >= filters.beds!);
    }

    // Bathrooms filter
    if (filters.bathrooms !== null) {
      filtered = filtered.filter((property) => property.bathrooms >= filters.bathrooms!);
    }

    // Guests filter
    if (filters.guests !== null) {
      filtered = filtered.filter((property) => property.guests >= filters.guests!);
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((property) =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    // Sort
    const sorted = [...filtered];
    switch (filters.sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return sorted;
  }, [properties, searchQuery, selectedCategory, filters]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] min-h-[500px] max-h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&auto=format&fit=crop&q=80"
            alt="Balkans"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {t('find.adventure')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              {t('discover.places')}
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Categories onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />

      {/* Filters and Properties */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Filters onFilterChange={setFilters} />
          </aside>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
        {filteredProperties.length > 0 ? (
          <>
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {searchQuery 
                  ? `${t('search.results')} "${searchQuery}"` 
                  : selectedCategory 
                    ? `${getCategoryLabel(selectedCategory, t)} ${t('properties')}` 
                    : t('explore.all')
                }
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-[15px]">
                {filteredProperties.length} {filteredProperties.length === 1 ? t('stay') : t('stays')}
              </p>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProperties.map((property, index) => {
                  const propertyId = properties.findIndex(p => p === property);
                  return (
                    <PropertyCard 
                      key={`property-${propertyId >= 0 ? propertyId : index}`} 
                      {...property} 
                      id={propertyId >= 0 ? propertyId : index} 
                    />
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('no.properties')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('try.adjusting')}</p>
          </div>
        )}
          </div>
        </div>
      </section>
    </div>
  );
}
