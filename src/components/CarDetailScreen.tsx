import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, Share2, Users, Settings2, Fuel, MessageCircle, Thermometer, Music, Calendar, CheckCircle2 } from 'lucide-react';
import { Car } from '../types';
import { useBooking } from '../contexts/BookingContext';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

type CarDetailScreenProps = {
  car: Car;
  onBack: () => void;
};

function MapSection({ car }: { car: Car }) {
  if (!hasValidKey) {
    return (
      <div className="h-60 w-full rounded-app bg-surface dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center p-6 text-center">
        <div className="max-w-xs">
          <h3 className="font-bold text-on-surface dark:text-white mb-2">Clé API Google Maps requise</h3>
          <p className="text-xs text-on-surface-variant dark:text-white/60 mb-4">
            Pour afficher la carte interactive, assurez-vous d'avoir ajouté votre clé API dans les 
            <span className="font-bold"> Secrets</span> (Settings → Secrets → GOOGLE_MAPS_PLATFORM_KEY).
          </p>
          <a 
            href="https://console.cloud.google.com/google/maps-apis/start" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-primary uppercase tracking-widest border-b border-primary pb-1"
          >
            Obtenir une clé API
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-60 w-full rounded-app bg-surface dark:bg-white/5 overflow-hidden relative border border-border dark:border-white/10 shadow-inner">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={car.coordinates}
          defaultZoom={14}
          mapId="ELITEDRIVE_MAP"
          gestureHandling="greedy"
          disableDefaultUI={true}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          <AdvancedMarker position={car.coordinates}>
            <Pin background="#2D5BFF" glyphColor="#fff" borderColor="#fff" />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
}

export default function CarDetailScreen({ car, onBack }: CarDetailScreenProps) {
  const { createBooking, agencies } = useBooking();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const agency = agencies.find(a => a.id === car.agencyId);

  const handleBooking = () => {
    setIsBooking(true);
    setBookingStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Default booking dates (next 3 days)
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      createBooking(car, startDate, endDate);
      setBookingStatus('success');
      
      setTimeout(() => {
        setIsBooking(false);
        setBookingStatus('idle');
        onBack();
      }, 2000);
    }, 1500);
  };
  return (
    <div className="bg-white dark:bg-[#0f0f11] min-h-screen pb-32 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a1d] shadow-md text-on-surface dark:text-white active:scale-95 transition-transform pointer-events-auto"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <div className="flex items-center gap-3 pointer-events-auto">
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

            {/* Agency */}
            <div className="flex items-center justify-between p-4 bg-surface dark:bg-white/5 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={agency?.logo || "https://picsum.photos/100/100"} 
                    alt={agency?.name}
                    className="w-10 h-10 rounded-full object-cover border border-primary/20"
                  />
                </div>
                <div>
                  <p className="text-on-surface-variant dark:text-white/60 text-[10px] font-bold uppercase">Agence</p>
                  <h3 className="font-bold text-sm text-on-surface dark:text-white">{agency?.name || 'Partenaire EliteDrive'}</h3>
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
            
            <MapSection car={car} />
          </section>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-white/90 dark:bg-[#0f0f11]/90 backdrop-blur-xl z-50 border-t border-border dark:border-white/10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            role="button"
            onClick={handleBooking}
            disabled={isBooking}
            className={`flex-1 font-bold py-4 px-8 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
               bookingStatus === 'success' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-primary text-white shadow-primary/20'
            }`}
          >
            <AnimatePresence mode="wait">
              {bookingStatus === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Calendar size={20} />
                  Réserver maintenant
                </motion.div>
              )}
              {bookingStatus === 'loading' && (
                <motion.div 
                   key="loading"
                   className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Traitement...</span>
                </motion.div>
              )}
              {bookingStatus === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Réservé avec succès !
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
