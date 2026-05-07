export type UserRole = 'Client' | 'AgencyManager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  agencyId?: string; // Only for AgencyManager
}

export interface Agency {
  id: string;
  name: string;
  logo: string;
  rating: number;
}

export interface Car {
  id: string;
  agencyId: string;
  name: string;
  type: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Electric' | 'Petrol' | 'Hybrid';
  description: string;
  features: string[];
  location: string;
  isFavorite?: boolean;
  isLimited?: boolean;
  isInternal?: boolean; // True if listed directly by platform
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface FilterState {
  category: string;
  searchQuery: string;
  priceRange: [number, number];
  transmission: string | null;
  features: string[];
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  agencyId: string;
  carName: string;
  carImage: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  confirmationNumber: string;
  createdAt: string;
}
