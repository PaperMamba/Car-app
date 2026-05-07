import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Car } from '../types';
import CarCard from './CarCard';
import { useBooking } from '../contexts/BookingContext';

type ExploreScreenProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCar: (car: Car) => void;
  onOpenFilters: () => void;
};

export default function ExploreScreen({ 
  activeCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange, 
  onSelectCar, 
  onOpenFilters 
}: ExploreScreenProps) {
  const { filteredCars, currentUser } = useBooking();
  const categories = ['Tout', 'Luxury', 'SUV', 'Economy', 'Electric', 'Sports'];

  return (
    <div className="pb-32">
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between">
        <div className="greeting">
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">
            Salut, {currentUser?.name.split(' ')[0] || 'Utilisateur'}
          </h1>
          <p className="text-on-surface-variant text-sm mt-0.5">Prêt pour votre trajet ?</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-border overflow-hidden cursor-pointer border-2 border-primary"
        >
          <img 
            src={currentUser?.avatar || "https://picsum.photos/100/100"} 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </header>

      <main className="space-y-6">
        {/* Search */}
        <div className="px-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
              <MapPin size={18} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher des voitures..."
              className="w-full h-12 pl-12 pr-4 bg-surface dark:bg-white/5 border-none focus:ring-2 focus:ring-primary rounded-xl text-sm font-medium text-on-surface dark:text-white placeholder:text-on-surface-variant transition-all duration-300"
            />
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={onOpenFilters}
              className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-white rounded-lg text-xs font-bold"
            >
              Filtres
            </motion.button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-6 pb-2">
          {categories.map((cat) => (
            <motion.button 
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(cat)}
              className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Car List */}
        <div className="px-6 space-y-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <div key={car.id}>
                <CarCard 
                  car={car} 
                  index={index} 
                  onClick={() => onSelectCar(car)} 
                />
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="text-6xl text-on-surface-variant/30">🔍</div>
              <h3 className="text-xl font-bold dark:text-white leading-tight">Aucune voiture trouvée</h3>
              <p className="text-on-surface-variant dark:text-white/60">Essayez de modifier vos filtres pour voir plus de résultats.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
