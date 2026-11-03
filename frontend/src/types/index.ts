export interface Vehicle {
  id: string;
  _id?: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  monthlyPayment?: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual' | 'Dual-Clutch';
  bodyType: 'Sedan' | 'SUV' | 'Coupe' | 'Convertible' | 'Hypercar' | 'Truck';
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  horsepower: number;
  acceleration: string; // e.g. "0-60 in 2.9s"
  topSpeed: string;
  condition: 'Brand New' | 'Certified Pre-Owned' | 'Used';
  location: string;
  images: string[];
  features: string[];
  dealer: {
    id: string;
    name: string;
    verified: boolean;
    rating: number;
    reviewCount: number;
    phone: string;
    logo: string;
  };
  featured?: boolean;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  country: string;
  founded: number;
  vehicleCount: number;
  description: string;
  heroImage: string;
}

export interface Dealer {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  location: string;
  address: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  email: string;
  website: string;
  inventoryCount: number;
  verified: boolean;
  logo: string;
  bannerImage: string;
  established: number;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Review' | 'Industry News' | 'Electric Vehicles' | 'Buying Guide';
  publishedAt: string;
  author: string;
  readTime: string;
  coverImage: string;
}

export interface FilterState {
  make?: string;
  model?: string;
  bodyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
  condition?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc';
}

