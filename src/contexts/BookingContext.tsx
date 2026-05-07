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
  logout: () => void;
  createBooking: (car: Car, startDate: string, endDate: string) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : MOCK_USERS[0]; // Default to Client
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

  const logout = () => setCurrentUser(null);

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

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
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
      cars: MOCK_CARS,
      agencies: MOCK_AGENCIES,
      bookings,
      filters,
      setFilters,
      filteredCars,
      login,
      logout,
      createBooking,
      updateBookingStatus,
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
