import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ExploreScreen from './components/ExploreScreen';
import BookingsScreen from './components/BookingsScreen';
import ProfileScreen from './components/ProfileScreen';
import CarDetailScreen from './components/CarDetailScreen';
import FiltersScreen from './components/FiltersScreen';
import BottomNav from './components/BottomNav';
import { Car } from './types';
import { MOCK_CARS } from './data';

export type FilterState = {
  category: string;
  searchQuery: string;
  priceRange: [number, number];
  transmission: string | null;
  features: string[];
};

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const [filters, setFilters] = useState<FilterState>({
    category: 'Tout',
    searchQuery: '',
    priceRange: [50, 1000],
    transmission: null,
    features: [],
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

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

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const screenVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const renderScreen = () => {
    if (selectedCar) {
      return (
        <motion.div key="detail" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen">
          <CarDetailScreen car={selectedCar} onBack={() => setSelectedCar(null)} />
        </motion.div>
      );
    }

    if (isFiltersOpen) {
      return (
        <motion.div key="filters" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-[60]">
          <FiltersScreen 
            filters={filters}
            onUpdateFilters={setFilters}
            onClose={() => setIsFiltersOpen(false)} 
          />
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {(() => {
            switch (activeTab) {
              case 'explore':
                return (
                  <ExploreScreen 
                    cars={filteredCars}
                    activeCategory={filters.category}
                    onCategoryChange={(cat) => setFilters({ ...filters, category: cat })}
                    searchQuery={filters.searchQuery}
                    onSearchChange={(query) => setFilters({ ...filters, searchQuery: query })}
                    onSelectCar={setSelectedCar} 
                    onOpenFilters={() => setIsFiltersOpen(true)} 
                  />
                );
              case 'bookings':
                return <BookingsScreen />;
              case 'profile':
                return <ProfileScreen isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
              case 'favorites':
                return (
                  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-4">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="w-20 h-20 bg-surface rounded-full flex items-center justify-center"
                    >
                      <span className="text-4xl">❤️</span>
                    </motion.div>
                    <h2 className="text-2xl font-bold">Vos Favoris</h2>
                    <p className="text-on-surface-variant">Vous n'avez pas encore de favoris. Commencez à explorer !</p>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('explore')}
                      className="px-8 py-3 bg-primary text-white rounded-xl font-bold"
                    >
                      Explorer les voitures
                    </motion.button>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f11] transition-colors duration-300">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
      
      {!selectedCar && !isFiltersOpen && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}
