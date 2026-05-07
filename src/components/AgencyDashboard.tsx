import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Car as CarIcon, User as UserIcon, TrendingUp, Calendar, Plus, Trash2, Mail, ExternalLink } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { Car } from '../types';

export default function AgencyDashboard() {
  const { currentUser, bookings, updateBookingStatus, cars, agencies, addCar, removeCar } = useBooking();
  const [showAddCar, setShowAddCar] = useState(false);
  const [newCar, setNewCar] = useState<Partial<Car>>({
    name: '',
    price: 150,
    category: 'Luxury',
    type: 'Berline de luxe',
  });

  // Find agency details
  const agency = agencies.find(a => a.id === currentUser?.agencyId);
  
  // Filter bookings for this agency
  const agencyBookings = bookings.filter(b => b.agencyId === currentUser?.agencyId);
  const pendingBookings = agencyBookings.filter(b => b.status === 'pending');
  const confirmedBookings = agencyBookings.filter(b => b.status === 'confirmed');

  // Filter cars for this agency
  const agencyCars = cars.filter(c => c.agencyId === currentUser?.agencyId);

  const stats = [
    { label: 'En attente', value: pendingBookings.length, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Confirmées', value: confirmedBookings.length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Véhicules', value: agencyCars.length, icon: CarIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    addCar(newCar);
    setShowAddCar(false);
    setNewCar({ name: '', price: 150, category: 'Luxury', type: 'Berline de luxe' });
  };

  if (!currentUser || currentUser.role !== 'AgencyManager') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
          <Mail size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2 dark:text-white">Devenir agence partenaire</h2>
        <p className="text-on-surface-variant dark:text-white/60 mb-8 max-w-sm">
          Vous souhaitez lister vos véhicules sur EliteDrive ? Envoyez-nous une demande d'accréditation.
        </p>
        <a 
          href="mailto:partners@elitedrive.com?subject=Demande d'accréditation Agence"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
        >
          Envoyer une demande par mail
          <ExternalLink size={18} />
        </a>
      </div>
    );
  }

  return (
    <div className="pb-32 pt-8 px-6 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">Tableau de bord</h1>
          <p className="text-on-surface-variant dark:text-white/60">{agency?.name}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-surface dark:bg-white/5 border border-border dark:border-white/10 p-2 overflow-hidden">
          <img src={agency?.logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 bg-white dark:bg-[#1a1a1d] rounded-2xl border border-border dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-bold dark:text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fleet Management */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold dark:text-white">Ma Flotte</h2>
          <button 
            onClick={() => setShowAddCar(true)}
            className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl transition-colors text-sm font-bold"
          >
            <Plus size={18} />
            Ajouter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {agencyCars.map((car) => (
              <motion.div 
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3 bg-white dark:bg-[#1a1a1d] rounded-2xl border border-border dark:border-white/10 shadow-sm flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface dark:bg-white/5 flex-shrink-0">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold dark:text-white text-sm truncate">{car.name}</h3>
                  <p className="text-primary font-bold text-sm">${car.price}<span className="text-[10px] text-on-surface-variant">/j</span></p>
                </div>
                <button 
                  onClick={() => removeCar(car.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Add Car Modal */}
      <AnimatePresence>
        {showAddCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#1a1a1d] w-full max-w-md rounded-3xl p-8 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white">Nouveau Véhicule</h2>
                <button onClick={() => setShowAddCar(false)} className="p-2 hover:bg-surface dark:hover:bg-white/5 rounded-full">
                  <XCircle size={24} />
                </button>
              </div>

              <form onSubmit={handleAddCar} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-on-surface-variant block mb-1">Nom du modèle</label>
                  <input 
                    required
                    type="text" 
                    value={newCar.name}
                    onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                    className="w-full h-12 bg-surface dark:bg-white/5 rounded-xl px-4 border border-border dark:border-white/10 outline-none focus:border-primary transition-colors dark:text-white"
                    placeholder="ex: Porsche 911 GT3"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-on-surface-variant block mb-1">Catégorie</label>
                  <select 
                    value={newCar.category}
                    onChange={(e) => setNewCar({...newCar, category: e.target.value as any})}
                    className="w-full h-12 bg-surface dark:bg-white/5 rounded-xl px-4 border border-border dark:border-white/10 outline-none focus:border-primary transition-colors dark:text-white"
                  >
                    <option value="Luxury">Luxe</option>
                    <option value="SUV">SUV</option>
                    <option value="Economy">Economie</option>
                    <option value="Electric">Electrique</option>
                    <option value="Sports">Sportive</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-on-surface-variant block mb-1">Prix journalier ($)</label>
                  <input 
                    required
                    type="number" 
                    value={newCar.price}
                    onChange={(e) => setNewCar({...newCar, price: parseInt(e.target.value)})}
                    className="w-full h-12 bg-surface dark:bg-white/5 rounded-xl px-4 border border-border dark:border-white/10 outline-none focus:border-primary transition-colors dark:text-white"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 mt-4"
                >
                  Ajouter à la flotte
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Requests */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold dark:text-white">Demandes en attente</h2>
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest leading-none flex items-center h-5">
            {pendingBookings.length} Nouvelles
          </span>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking) => {
                const car = cars.find(c => c.id === booking.carId);
                return (
                  <motion.div 
                    key={booking.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-white dark:bg-[#1a1a1d] rounded-2xl border border-border dark:border-white/10 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface dark:bg-white/5">
                      <img src={booking.carImage} alt={booking.carName} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-lg dark:text-white truncate">{booking.carName}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant font-medium">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-primary" />
                          <span>{booking.startDate} to {booking.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserIcon size={12} className="text-primary" />
                          <span>Client: {booking.userId}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-border" />
                          <span>{booking.confirmationNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="flex-1 md:flex-none h-10 px-4 rounded-xl bg-surface dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-on-surface-variant font-bold text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <XCircle size={16} />
                        Refuser
                      </button>
                      <button 
                         onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="flex-1 md:flex-none h-10 px-4 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={16} />
                        Approuver
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="py-12 border-2 border-dashed border-border dark:border-white/5 rounded-2xl text-center">
                <Clock className="mx-auto text-on-surface-variant mb-3 opacity-20" size={40} />
                <p className="text-on-surface-variant font-medium">Aucune demande en attente pour le moment.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Active Rentals */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold dark:text-white">Dernières Activités</h2>
        <div className="bg-white dark:bg-[#1a1a1d] rounded-2xl border border-border dark:border-white/10 divide-y divide-border dark:divide-white/5">
          {agencyBookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {booking.status === 'confirmed' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white">{booking.carName}</p>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{booking.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">${booking.totalPrice}</p>
                <p className="text-[10px] text-on-surface-variant font-medium">{booking.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
