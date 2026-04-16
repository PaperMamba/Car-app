import React from 'react';
import { motion } from 'motion/react';
import { Settings, Calendar, Clock } from 'lucide-react';
import { MOCK_BOOKINGS } from '../data';

export default function BookingsScreen() {
  return (
    <div className="pb-32 bg-white dark:bg-[#0f0f11] min-h-screen transition-colors duration-300">
      <header className="fixed top-0 w-full z-50 glass-header">
        <div className="flex items-center justify-between px-6 h-16">
          <h1 className="font-bold text-lg tracking-tight text-on-surface dark:text-white">Réservations</h1>
          <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface dark:bg-white/5">
            <Settings size={20} className="text-primary" />
          </motion.button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight text-on-surface dark:text-white mb-2">Historique</h2>
          <p className="text-on-surface-variant dark:text-white/60">Gérez vos réservations actives et passées.</p>
        </motion.div>

        <div className="space-y-6">
          {MOCK_BOOKINGS.map((booking, i) => (
            <motion.div 
              key={booking.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white dark:bg-[#1a1a1d] rounded-app shadow-sm border border-border dark:border-white/10 overflow-hidden group ${booking.status === 'Cancelled' ? 'opacity-60' : ''}`}
            >
              <div className="relative h-48 w-full overflow-hidden bg-surface dark:bg-white/5">
                <img 
                  src={booking.carImage} 
                  alt={booking.carName}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${booking.status === 'Cancelled' ? 'grayscale' : ''}`}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                    booking.status === 'Upcoming' ? 'bg-primary text-white' :
                    booking.status === 'Completed' ? 'bg-emerald-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {booking.status === 'Upcoming' ? 'À venir' : 
                     booking.status === 'Completed' ? 'Terminé' : 'Annulé'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface dark:text-white">{booking.carName}</h3>
                    <p className="text-xs text-on-surface-variant dark:text-white/40 font-bold uppercase tracking-widest mt-1">Conf: {booking.confirmationNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className={`block text-xl font-bold ${booking.status === 'Cancelled' ? 'text-on-surface-variant line-through' : 'text-primary'}`}>
                      ${booking.totalPrice.toFixed(0)}
                    </span>
                    <span className="text-[10px] text-on-surface-variant dark:text-white/40 font-bold uppercase tracking-widest">
                      {booking.status === 'Cancelled' ? 'Remboursé' : 'Total'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-4 border-t border-border dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface dark:bg-white/5 flex items-center justify-center">
                      <Calendar size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant dark:text-white/40 font-bold uppercase tracking-tighter">Départ</p>
                      <p className="text-sm font-bold dark:text-white">{booking.pickupDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface dark:bg-white/5 flex items-center justify-center">
                      <Clock size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant dark:text-white/40 font-bold uppercase tracking-tighter">Retour</p>
                      <p className="text-sm font-bold dark:text-white">{booking.returnDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}