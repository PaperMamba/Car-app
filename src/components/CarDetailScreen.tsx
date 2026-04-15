import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, Share2, Users, Settings2, Fuel, MessageCircle, Award, Thermometer, Music } from 'lucide-react';
import { Car } from '../types';

type CarDetailScreenProps = {
  car: Car;
  onBack: () => void;
};

export default function CarDetailScreen({ car, onBack }: CarDetailScreenProps) {
  return (
    <div className="bg-white dark:bg-[#0f0f11] min-h-screen pb-32 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a1d] shadow-md text-on-surface dark:text-white active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <div className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a1d] shadow-md text-on-surface dark:text-white"
          >
            <Heart size={20} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a1d] shadow-md text-on-surface dark:text-white"
          >
            <Share2 size={20} />
          </motion.button>
        </div>
      </header>

      <main>
        {/* Hero Image */}
        <section className="relative w-full h-[400px] overflow-hidden bg-surface dark:bg-white/5">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={car.image} 
            alt={car.name}
            className="w-full h-full object-cover"
          />
        </section>

        {/* Content */}
        <div className="px-6 -mt-8 relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-[#1a1a1d] rounded-app p-8 shadow-lg border border-border dark:border-white/10"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="px-3 py-1 bg-surface dark:bg-white/5 text-primary font-bold text-[10px] uppercase tracking-widest rounded-full">
                {car.type}
              </span>
              <div className="text-primary font-bold text-xl">
                ${car.price}<span className="text-on-surface-variant dark:text-white/60 font-normal text-sm ml-1">/jour</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-on-surface dark:text-white mb-6">
              {car.name}
            </h1>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="stat-item items-center justify-center">
                <Users size={18} className="text-primary" />
                <span className="text-[10px] font-bold text-on-surface-variant dark:text-white/60 uppercase tracking-tighter">{car.seats} Places</span>
              </div>
              <div className="stat-item items-center justify-center">
                <Settings2 size={18} className="text-primary" />
                <span className="text-[10px] font-bold text-on-surface-variant dark:text-white/60 uppercase tracking-tighter">{car.transmission}</span>
              </div>
              <div className="stat-item items-center justify-center">
                <Fuel size={18} className="text-primary" />
                <span className="text-[10px] font-bold text-on-surface-variant dark:text-white/60 uppercase tracking-tighter">{car.fuel}</span>
              </div>
            </div>

            {/* Host */}
            <div className="flex items-center justify-between p-4 bg-surface dark:bg-white/5 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={car.hostAvatar} 
                    alt={car.host}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-on-surface-variant dark:text-white/60 text-[10px] font-bold uppercase">Hôte</p>
                  <h3 className="font-bold text-sm text-on-surface dark:text-white">{car.host}</h3>
                </div>
              </div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center text-primary bg-white dark:bg-white/10 rounded-full shadow-sm"
              >
                <MessageCircle size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Description */}
          <section className="mt-10 mb-8">
            <h2 className="font-bold text-xl mb-4 dark:text-white">Description du véhicule</h2>
            <p className="text-on-surface-variant dark:text-white/60 leading-relaxed text-sm">
              {car.description}
            </p>

            {/* Features Bento */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="stat-item"
              >
                <Thermometer size={18} className="text-primary" />
                <p className="font-bold text-sm mt-2 dark:text-white">Climatisation</p>
                <p className="text-[11px] text-on-surface-variant dark:text-white/60">Luxe bi-zone</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="stat-item"
              >
                <Music size={18} className="text-primary" />
                <p className="font-bold text-sm mt-2 dark:text-white">Divertissement</p>
                <p className="text-[11px] text-on-surface-variant dark:text-white/60">Bose Surround</p>
              </motion.div>
            </div>
          </section>

          {/* Location */}
          <section className="mt-4 mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl dark:text-white">Localisation</h2>
              <span className="text-primary text-sm font-bold">{car.location}</span>
            </div>
            <div className="h-40 w-full rounded-app bg-surface dark:bg-white/5 overflow-hidden relative border border-border dark:border-white/10">
              <img 
                src="https://picsum.photos/seed/map/800/400?grayscale&blur=2" 
                alt="Map"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-white/90 dark:bg-[#0f0f11]/90 backdrop-blur-xl z-50 border-t border-border dark:border-white/10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-[0.98]"
          >
            Demander la location
          </motion.button>
        </div>
      </div>
    </div>
  );
}
