export interface Property {
  imageUrl: string;
  images: string[];
  location: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  dates: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  category: string[];
  host: {
    name: string;
    isSuperhost: boolean;
    hostingSince: string;
    avatar?: string;
    responseTime?: string;
    responseRate?: number;
  };
  reviews: number;
  checkIn?: string;
  checkOut?: string;
}