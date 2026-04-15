import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, Car, Heart, User } from 'lucide-react';

type BottomNavProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'explore', label: 'Explorer', icon: LayoutGrid },
    { id: 'bookings', label: 'Réservations', icon: Car },
    { id: 'favorites', label: 'Favoris', icon: Heart },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-white dark:bg-[#0f0f11] border-t border-border dark:border-white/10 pb-8 pt-3 px-6 transition-colors duration-300">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 transition-all duration-300"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant'
              }`}>
                <Icon size={20} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
