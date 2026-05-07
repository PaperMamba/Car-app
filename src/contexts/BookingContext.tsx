import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { User, Car, Booking, Agency, BookingStatus, FilterState } from '../types';
import { MOCK_CARS, MOCK_BOOKINGS, MOCK_AGENCIES, MOCK_USERS } from '../data';

interface BookingContextType {
  currentUser: User | null;
  cars: Car[];
  agencies: Agency[];
  bookings: Booking[];
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  filteredCars: Car[];
  login: (email: string) => void;
  loginSocial: (provider: 'Google' | 'Apple' | 'SSO') => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  createBooking: (car: Car, startDate: string, endDate: string) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  addCar: (carData: Partial<Car>) => void;
  removeCar: (carId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : MOCK_USERS[0]; // Default to Client
  });

  const [cars, setCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem('cars');
    return saved ? JSON.parse(saved) : MOCK_CARS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : MOCK_BOOKINGS;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [filters, setFilters] = useState<FilterState>({
    category: 'Tout',
    searchQuery: '',
    priceRange: [50, 1000],
    transmission: null,
    features: [],
  });

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const login = (email: string) => {
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) setCurrentUser(user);
  };

  const loginSocial = (provider: 'Google' | 'Apple' | 'SSO') => {
    console.log(`Logging in with ${provider}`);
    // Simulate social login by picking user_1 (Client)
    setCurrentUser(MOCK_USERS[0]);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (data: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...data });
    }
  };

  const createBooking = (car: Car, startDate: string, endDate: string) => {
    if (!currentUser) return;
    
    const diffTime = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    
    const newBooking: Booking = {
      id: `b_${Date.now()}`,
      carId: car.id,
      userId: currentUser.id,
      agencyId: car.agencyId,
      carName: car.name,
      carImage: car.image,
      totalPrice: car.price * diffDays,
      startDate,
      endDate,
      status: 'pending',
      confirmationNumber: `#ED-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status } : b
    ));
  };

  const addCar = (carData: Partial<Car>) => {
    const newCar: Car = {
      id: `car_${Date.now()}`,
      agencyId: currentUser?.agencyId || 'agency_1',
      name: carData.name || 'Nouveau Véhicule',
      type: carData.type || 'Luxe',
      category: carData.category || 'Luxury',
      price: carData.price || 0,
      rating: 5.0,
      image: carData.image || 'https://picsum.photos/seed/newcar/600/400',
      seats: carData.seats || 5,
      transmission: carData.transmission || 'Automatic',
      fuel: carData.fuel || 'Petrol',
      description: carData.description || '',
      features: carData.features || [],
      location: carData.location || 'Paris, FR',
      coordinates: carData.coordinates || { lat: 48.8566, lng: 2.3522 },
    };
    setCars(prev => [newCar, ...prev]);
  };

  const removeCar = (carId: string) => {
    setCars(prev => prev.filter(c => c.id !== carId));
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      if (filters.category !== 'Tout' && car.category !== filters.category) return false;
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.features.length > 0 && !filters.features.every(f => car.features.includes(f))) return false;
      if (filters.searchQuery && !car.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <BookingContext.Provider value={{
      currentUser,
      cars,
      agencies: MOCK_AGENCIES,
      bookings,
      filters,
      setFilters,
      filteredCars,
      login,
      loginSocial,
      logout,
      updateProfile,
      createBooking,
      updateBookingStatus,
      addCar,
      removeCar,
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};
