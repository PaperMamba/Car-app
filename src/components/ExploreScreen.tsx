import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Car } from '../types';

type ExploreScreenProps = {
  cars: Car[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSelectCar: (car: Car) => void;
  onOpenFilters: () => void;
};

export default function ExploreScreen({ cars, activeCategory, onCategoryChange, onSelectCar, onOpenFilters }: ExploreScreenProps) {
  const categories = ['Tout', 'Luxury', 'SUV', 'Economy', 'Electric', 'Sports'];

  return (
    <div className="pb-32">
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between">
        <div className="greeting">
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">Salut, Marc</h1>
          <p className="text-on-surface-variant text-sm mt-0.5">Prêt pour votre trajet ?</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-border overflow-hidden"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTSSeF5fUi8T-XTg6VmQG_xqn2qx25vIX0GHxyjRxt6F-3zuxhwlhxdSfnvnT9ULqMWAVNlmh1y69SFVEvVabFvLT6Jy0vb9jE4Q682pINnI4UgEC0o58T7R24AXpEkfz_kETNlzqDM99bebPBkpyUYQeOcQAkbzHEKDpCGFKK5fCwAlnNIP1LSc3ZCQC2sunGmvIK-2fjGufvytsKkbt6TW-H01WbYrEQD-ftIv0EbW1ZN8a3SP492VjrYPTqX94E_FrKQ3Rwmkzj" 
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
          {cars.length > 0 ? (
            cars.map((car) => (
              <motion.div 
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => onSelectCar(car)}
                className="group relative bg-white dark:bg-[#1a1a1d] rounded-app overflow-hidden flex flex-col shadow-sm border border-border dark:border-white/10 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {car.isLimited && (
                    <div className="absolute top-4 left-4 bg-accent text-on-surface px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Dernière chance !
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        {car.type}
                      </span>
                      <div className="flex items-center gap-1 text-primary">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold">{car.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface dark:text-white mb-4 leading-tight">
                      {car.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border dark:border-white/10">
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">Tarif journalier</p>
                      <p className="text-xl font-bold text-primary">
                        ${car.price}<span className="text-xs font-medium text-on-surface-variant">/jour</span>
                      </p>
                    </div>
                    <motion.button 
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                      <ArrowRight size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="text-6xl">🔍</div>
              <h3 className="text-xl font-bold">Aucune voiture trouvée</h3>
              <p className="text-on-surface-variant">Essayez de modifier vos filtres pour voir plus de résultats.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
