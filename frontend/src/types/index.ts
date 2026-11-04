export interface Vehicle {
  id: string;
  _id?: string;
  title: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  currency?: string;
  monthlyPayment?: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual' | 'Dual-Clutch';
  bodyType: 'SUV' | 'Sedan' | 'Coupe' | 'Hatchback' | 'Convertible' | 'Pickup' | 'Electric' | 'Luxury' | 'Hypercar' | 'Truck';
  engineCapacity?: string;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  horsepower: number;
  acceleration: string; // e.g. "0-60 in 3.1s"
  topSpeed: string;
  condition: 'Brand New' | 'Certified Pre-Owned' | 'Used';
  location: string;
  description?: string;
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
  isRecent?: boolean;
  isElectric?: boolean;
  isBudget?: boolean;
  isLuxury?: boolean;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  country: string;
  founded: number;
  vehicleCount?: number;
  count?: number;
  description?: string;
  desc?: string;
  heroImage?: string;
  hero?: string;
}

export interface BodyStyle {
  id: string;
  name: string;
  slug: string;
  count: string;
  icon: string;
  image: string;
  description: string;
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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  vehiclePurchased: string;
  isDemo: boolean;
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
  location?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc';
}
