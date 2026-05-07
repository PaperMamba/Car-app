import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ExploreScreen from './components/ExploreScreen';
import BookingsScreen from './components/BookingsScreen';
import ProfileScreen from './components/ProfileScreen';
import CarDetailScreen from './components/CarDetailScreen';
import FiltersScreen from './components/FiltersScreen';
import BottomNav from './components/BottomNav';
import AgencyDashboard from './components/AgencyDashboard';
import { Car } from './types';
import { BookingProvider, useBooking } from './contexts/BookingContext';

function AppContent() {
  const { 
    currentUser, 
    filteredCars, 
    filters, 
    setFilters, 
    isDarkMode, 
    toggleDarkMode 
  } = useBooking();

  const [activeTab, setActiveTab] = useState('explore');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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
                    activeCategory={filters.category}
                    onCategoryChange={(cat) => setFilters({ ...filters, category: cat })}
                    searchQuery={filters.searchQuery}
                    onSearchChange={(query) => setFilters({ ...filters, searchQuery: query })}
                    onSelectCar={setSelectedCar} 
                    onOpenFilters={() => setIsFiltersOpen(true)}
                    // cars prop removed as it's now internal to ExploreScreen via context
                  />
                );
              case 'bookings':
                return currentUser?.role === 'AgencyManager' ? <AgencyDashboard /> : <BookingsScreen />;
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

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
