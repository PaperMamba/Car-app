export type Car = {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  rating: number;
  host: string;
  hostAvatar: string;
  image: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Electric' | 'Petrol' | 'Hybrid';
  description: string;
  features: string[];
  location: string;
  isFavorite?: boolean;
  isLimited?: boolean;
};

export type BookingStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export type Booking = {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  confirmationNumber: string;
  totalPrice: number;
  pickupDate: string;
  returnDate: string;
  status: BookingStatus;
  isRefunded?: boolean;
};
