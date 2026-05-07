import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, CreditCard, Bell, HelpCircle, ChevronRight, Moon, Sun, LogOut, ShieldCheck, SwitchCamera } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

type ProfileScreenProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function ProfileScreen({ isDarkMode, onToggleDarkMode }: ProfileScreenProps) {
  const { currentUser, login, logout } = useBooking();

  const menuItems = [
    { icon: User, label: 'Informations personnelles', sub: 'Gérez vos détails de compte' },
    { icon: CreditCard, label: 'Méthodes de paiement', sub: 'Apple Pay et cartes Visa' },
    { icon: Bell, label: 'Notifications', sub: 'Alertes, marketing et offres' },
    { icon: HelpCircle, label: 'Aide & Support', sub: 'FAQ et conciergerie' },
  ];

  const handleRoleSwitch = () => {
    // Switch between user_1 (Client) and user_2 (AgencyManager)
    const nextEmail = currentUser?.role === 'Client' ? 'sarah@elitedrive.com' : 'marc@example.com';
    login(nextEmail);
  };

  return (
    <div className="pb-32">
      <header className="px-6 py-8 flex items-center justify-between">
        <div className="greeting">
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">Profil</h1>
          <p className="text-on-surface-variant text-sm mt-0.5">Paramètres de votre compte</p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onToggleDarkMode}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface dark:bg-white/5 text-on-surface dark:text-white"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </header>

      <main className="px-6 space-y-8">
        {/* Profile Hero */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className={`w-24 h-24 rounded-full p-1 ${currentUser?.role === 'AgencyManager' ? 'bg-accent' : 'bg-primary'}`}>
              <img 
                src={currentUser?.avatar} 
                alt={currentUser?.name}
                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-[#1a1a1d]"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white dark:border-[#1a1a1d] shadow-lg"
            >
              <Settings size={14} />
            </motion.button>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-bold text-xl tracking-tight text-on-surface dark:text-white">{currentUser?.name}</h2>
              {currentUser?.role === 'AgencyManager' && <ShieldCheck size={18} className="text-accent" />}
            </div>
            <p className="text-sm text-on-surface-variant font-medium">
              {currentUser?.role === 'AgencyManager' ? 'Gestionnaire d\'agence' : 'Membre EliteDrive Gold'}
            </p>
          </div>
        </section>

        {/* Role Switcher Action */}
        <section className="p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                <SwitchCamera size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-0.5">Mode Démo</p>
                <p className="text-sm font-bold dark:text-white">Changer de rôle</p>
              </div>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleRoleSwitch}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-md"
            >
              Passer en {currentUser?.role === 'Client' ? 'Manager' : 'Client'}
            </motion.button>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-item">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Trajets</span>
            <span className="text-xl font-bold text-on-surface dark:text-white">24</span>
          </div>
          <div className="stat-item">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Favoris</span>
            <span className="text-xl font-bold text-on-surface dark:text-white">14</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-3">
          {menuItems.map((item, i) => (
            <motion.div 
              key={i} 
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer flex items-center justify-between p-4 rounded-xl bg-surface dark:bg-white/5 hover:bg-border dark:hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-border dark:hover:border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-white/10 shadow-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <item.icon size={18} className="" />
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface dark:text-white">{item.label}</p>
                  <p className="text-[11px] text-on-surface-variant">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
            </motion.div>
          ))}
        </nav>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="w-full py-4 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Se déconnecter
        </motion.button>
      </main>
    </div>
  );
}
