import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  index: number;
  onClick: () => void;
}

export default function CarCard({ car, index, onClick }: CarCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
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
        {car.isInternal && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            EliteDrive Select
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
  );
}
