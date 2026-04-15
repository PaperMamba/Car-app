import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, CreditCard, Bell, HelpCircle, ChevronRight, Moon, Sun, LogOut } from 'lucide-react';

type ProfileScreenProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function ProfileScreen({ isDarkMode, onToggleDarkMode }: ProfileScreenProps) {
  const menuItems = [
    { icon: User, label: 'Informations personnelles', sub: 'Gérez vos détails de compte' },
    { icon: CreditCard, label: 'Méthodes de paiement', sub: 'Apple Pay et cartes Visa' },
    { icon: Bell, label: 'Notifications', sub: 'Alertes, marketing et offres' },
    { icon: HelpCircle, label: 'Aide & Support', sub: 'FAQ et conciergerie' },
  ];

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
            <div className="w-24 h-24 rounded-full p-1 bg-primary">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS9vQStMHMuClbwOGLDTq_r1Gmf7Cb57U2VakoGby2lJwqNTLQdsQMe5o5Vh-wfzWrQkUGGebfPyzUDq7yLigxjSCoyt54XLatnV_qsgdvQX1lgmo2BDjl-ji5-M8omFNVYSdnMdLed-uQWzW7-ytXRm-b-x_dDFs9uqgLus48hIqswQiITvZuu58_CWuvWQCgVPdvkVyqMXPTMVpZ6T7KrBCcGECo4o2lBKY4-a2e44I7slQIlbN7jkRFKj2HV4ovYGAeHLdCl97j" 
                alt="Alexander Graham"
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
            <h2 className="font-bold text-xl tracking-tight text-on-surface dark:text-white">Alexander Graham</h2>
            <p className="text-sm text-on-surface-variant">Membre vérifié</p>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-item">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Trajets</span>
            <span className="text-xl font-bold text-on-surface dark:text-white">24</span>
          </div>
          <div className="stat-item">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Points Éco</span>
            <span className="text-xl font-bold text-on-surface dark:text-white">1,280</span>
          </div>
          <div className="stat-item">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Alertes</span>
            <span className="text-xl font-bold text-on-surface dark:text-white">2</span>
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
              className="group cursor-pointer flex items-center justify-between p-4 rounded-xl bg-surface dark:bg-white/5 hover:bg-border dark:hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-white/10">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface dark:text-white">{item.label}</p>
                  <p className="text-[11px] text-on-surface-variant">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-on-surface-variant" />
            </motion.div>
          ))}
        </nav>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Se déconnecter
        </motion.button>
      </main>
    </div>
  );
}
