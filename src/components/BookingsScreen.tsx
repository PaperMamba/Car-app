import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Calendar, Clock, ChevronLeft, Car as CarIcon, AlertCircle } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

export default function BookingsScreen() {
  const { bookings, currentUser } = useBooking();

  // Filter bookings for the current client
  const userBookings = bookings.filter(b => b.userId === currentUser?.id);

  return (
    <div className="pb-32 bg-white dark:bg-[#0f0f11] min-h-screen transition-colors duration-300">
      <header className="fixed top-0 w-full z-50 glass-header">
        <div className="flex items-center justify-between px-6 h-16">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ChevronLeft size={24} className="text-on-surface dark:text-white" />
          </motion.div>
          <h1 className="font-bold text-lg tracking-tight text-on-surface dark:text-white">Mes Réservations</h1>
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
          <p className="text-on-surface-variant dark:text-white/60">Suivez vos demandes et locations en cours.</p>
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {userBookings.length > 0 ? (
              userBookings.map((booking, i) => (
                <motion.div 
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white dark:bg-[#1a1a1d] rounded-app shadow-sm border border-border dark:border-white/10 overflow-hidden group ${booking.status === 'cancelled' ? 'opacity-60' : ''}`}
                >
                  <div className="relative h-48 w-full overflow-hidden bg-surface dark:bg-white/5">
                    <img 
                      src={booking.carImage} 
                      alt={booking.carName}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${booking.status === 'cancelled' ? 'grayscale' : ''}`}
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                        booking.status === 'confirmed' ? 'bg-emerald-500 text-white' :
                        booking.status === 'pending' ? 'bg-orange-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmé' : 
                         booking.status === 'pending' ? 'En attente' : 'Annulé'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-on-surface dark:text-white">{booking.carName}</h3>
                        <p className="text-xs text-on-surface-variant dark:text-white/40 font-bold uppercase tracking-widest mt-1">Ref: {booking.confirmationNumber}</p>
                      </div>
                      <div className="text-right">
                        <span className={`block text-xl font-bold ${booking.status === 'cancelled' ? 'text-on-surface-variant line-through' : 'text-primary'}`}>
                          ${booking.totalPrice.toFixed(0)}
                        </span>
                        <span className="text-[10px] text-on-surface-variant dark:text-white/40 font-bold uppercase tracking-widest">
                          {booking.status === 'cancelled' ? 'Non débité' : 'Total'}
                        </span>
                      </div>
                    </div>
                    
                    {booking.status === 'pending' && (
                      <div className="mb-4 p-3 rounded-lg bg-orange-500/10 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <AlertCircle size={14} />
                        <span className="text-[10px] font-bold uppercase">En attente de confirmation par l'agence</span>
                      </div>
                    )}

                    <div className="flex items-center gap-6 pt-4 border-t border-border dark:border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface dark:bg-white/5 flex items-center justify-center">
                          <Calendar size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] text-on-surface-variant dark:text-white/40 font-bold uppercase tracking-tighter">Début</p>
                          <p className="text-sm font-bold dark:text-white">{booking.startDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface dark:bg-white/5 flex items-center justify-center">
                          <Clock size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] text-on-surface-variant dark:text-white/40 font-bold uppercase tracking-tighter">Fin</p>
                          <p className="text-sm font-bold dark:text-white">{booking.endDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4 bg-surface dark:bg-white/5 rounded-[32px] border-2 border-dashed border-border dark:border-white/10">
                <CarIcon className="mx-auto text-on-surface-variant/20" size={60} />
                <h3 className="text-xl font-bold dark:text-white">Aucune réservation</h3>
                <p className="text-on-surface-variant dark:text-white/60 text-sm max-w-[240px] mx-auto">Vous n'avez pas encore effectué de réservation. Louez votre première voiture dès maintenant !</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
