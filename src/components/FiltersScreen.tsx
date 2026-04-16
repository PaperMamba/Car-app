import React from 'react';
import { motion } from 'motion/react';
import { X, Car, Zap, Fuel, Leaf, Navigation, Bluetooth, Sun, Armchair } from 'lucide-react';
import { FilterState } from '../App';

type FiltersScreenProps = {
  filters: FilterState;
  onUpdateFilters: (filters: FilterState) => void;
  onClose: () => void;
};

export default function FiltersScreen({ filters, onUpdateFilters, onClose }: FiltersScreenProps) {
  const categories = ['Tout', 'Luxury', 'SUV', 'Economy', 'Electric', 'Sports'];
  const features = [
    { icon: Navigation, label: 'GPS Navigation' },
    { icon: Armchair, label: 'Leather Seats' },
    { icon: Sun, label: 'Sunroof' },
    { icon: Bluetooth, label: 'Bluetooth' },
  ];

  const updateCategory = (cat: string) => {
    onUpdateFilters({ ...filters, category: cat });
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    onUpdateFilters({ ...filters, features: newFeatures });
  };

  const updateTransmission = (trans: string) => {
    onUpdateFilters({ ...filters, transmission: trans });
  };

  const resetFilters = () => {
    onUpdateFilters({
      category: 'Tout',
      searchQuery: '',
      priceRange: [50, 1000],
      transmission: null,
      features: [],
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white dark:bg-[#0f0f11] flex flex-col">
      <header className="sticky top-0 w-full z-50 bg-white/80 dark:bg-[#0f0f11]/80 backdrop-blur-xl flex items-center justify-between px-6 py-4 border-b border-border dark:border-white/10">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onClose} 
          className="p-2 rounded-full hover:bg-surface dark:hover:bg-white/5 transition-colors"
        >
          <X size={24} className="text-on-surface-variant" />
        </motion.button>
        <h1 className="font-bold text-lg text-on-surface dark:text-white">Filtres</h1>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={resetFilters}
          className="text-primary font-bold text-sm hover:opacity-80 transition-opacity"
        >
          Réinitialiser
        </motion.button>
      </header>

      <main className="flex-grow overflow-y-auto px-6 py-8 space-y-10 no-scrollbar pb-32">
        {/* Category */}
        <section className="space-y-4">
          <h2 className="text-on-surface dark:text-white font-bold text-lg tracking-tight">Catégorie</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  filters.category === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-surface dark:bg-white/5 text-on-surface-variant hover:bg-border dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Price Range (Simplified for now) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-on-surface dark:text-white font-bold text-lg tracking-tight">Budget journalier</h2>
            <div className="text-primary text-sm font-bold bg-primary/10 px-3 py-1 rounded-lg">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}+
            </div>
          </div>
          <div className="relative h-12 flex items-center">
            <div className="absolute w-full h-1.5 bg-surface dark:bg-white/10 rounded-full"></div>
            <div className="absolute left-0 right-1/4 h-1.5 bg-primary rounded-full"></div>
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              className="absolute left-0 w-6 h-6 bg-white border-2 border-primary rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 top-1/2"
            />
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              className="absolute left-[75%] w-6 h-6 bg-white border-2 border-primary rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 top-1/2"
            />
          </div>
        </section>

        {/* Transmission */}
        <section className="space-y-4">
          <h2 className="text-on-surface dark:text-white font-bold text-lg tracking-tight">Transmission</h2>
          <div className="grid grid-cols-2 gap-4">
            {['Automatic', 'Manual'].map((trans) => (
              <motion.button
                key={trans}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateTransmission(trans)}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  filters.transmission === trans
                    ? 'bg-primary/5 border-primary shadow-sm'
                    : 'bg-surface dark:bg-white/5 border-transparent'
                }`}
              >
                <span className={`font-bold ${filters.transmission === trans ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {trans === 'Automatic' ? 'Automatique' : 'Manuelle'}
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  filters.transmission === trans ? 'border-primary' : 'border-outline-variant'
                }`}>
                  {filters.transmission === trans && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="space-y-4">
          <h2 className="text-on-surface dark:text-white font-bold text-lg tracking-tight">Options</h2>
          <div className="grid grid-cols-1 gap-3">
            {features.map((item, i) => {
              const isChecked = filters.features.includes(item.label);
              return (
                <motion.div 
                  key={i} 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleFeature(item.label)}
                  className={`group flex items-center justify-between p-5 rounded-2xl transition-all cursor-pointer border ${
                    isChecked 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-surface dark:bg-white/5 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} className={isChecked ? 'text-primary' : 'text-on-surface-variant'} />
                    <span className={`font-bold ${isChecked ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {item.label}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-primary' : 'border-2 border-outline-variant'
                  }`}>
                    {isChecked && <X size={14} className="text-white rotate-45" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 bg-white/90 dark:bg-[#0f0f11]/90 backdrop-blur-2xl z-50 border-t border-border dark:border-white/10">
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg tracking-wide shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
        >
          Appliquer les filtres
        </motion.button>
      </footer>
    </div>
  );
}
