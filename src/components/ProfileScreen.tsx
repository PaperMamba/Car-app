import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Settings, CreditCard, Bell, HelpCircle, ChevronRight, 
  Moon, Sun, LogOut, ShieldCheck, SwitchCamera, Camera, 
  Mail, Phone, MapPin, Check, X, Shield, Apple, Chrome, Key,
  AlertCircle, Plus
} from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

type ProfileScreenProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function ProfileScreen({ isDarkMode, onToggleDarkMode }: ProfileScreenProps) {
  const { currentUser, login, loginSocial, logout, updateProfile } = useBooking();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Local state for editing profile
  const [editData, setEditData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });

  const handleSaveProfile = () => {
    updateProfile(editData);
    setActiveModal(null);
  };

  const handleRoleSwitch = () => {
    const nextEmail = currentUser?.role === 'Client' ? 'sarah@elitedrive.com' : 'marc@example.com';
    login(nextEmail);
  };

  const menuItems = [
    { id: 'personal', icon: User, label: 'Informations personnelles', sub: 'Gérez vos détails de compte' },
    { id: 'payment', icon: CreditCard, label: 'Méthodes de paiement', sub: 'Apple Pay et cartes Visa' },
    { id: 'notifications', icon: Bell, label: 'Notifications', sub: 'Configuration des alertes' },
    { id: 'support', icon: HelpCircle, label: 'Aide & Support', sub: 'FAQ et conciergerie' },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8">
          <Shield size={40} />
        </div>
        <h1 className="text-3xl font-bold dark:text-white mb-2">Connectez-vous</h1>
        <p className="text-on-surface-variant dark:text-white/60 text-center mb-8">
          Accédez à vos réservations et gérez votre profil exclusif.
        </p>
        
        <div className="w-full space-y-4 max-w-sm">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => loginSocial('Google')}
            className="w-full py-4 bg-white dark:bg-[#1a1a1d] border border-border dark:border-white/10 rounded-xl font-bold flex items-center justify-center gap-3 shadow-sm"
          >
            <Chrome size={20} className="text-blue-500" />
            Continuer avec Google
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => loginSocial('Apple')}
            className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg"
          >
            <Apple size={20} />
            Continuer avec Apple
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => loginSocial('SSO')}
            className="w-full py-4 bg-primary/10 text-primary rounded-xl font-bold flex items-center justify-center gap-3"
          >
            <Key size={20} />
            Connexion SSO Entreprise
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <header className="px-6 py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-on-surface dark:text-white">Profil</h1>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onToggleDarkMode}
          className="w-11 h-11 rounded-full bg-surface dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-primary" />}
        </motion.button>
      </header>

      <main className="px-6 space-y-8">
        {/* Profile Hero */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className={`w-28 h-28 rounded-full p-1 ${currentUser?.role === 'AgencyManager' ? 'bg-accent' : 'bg-primary'}`}>
              <img 
                src={currentUser?.avatar} 
                alt={currentUser?.name}
                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-[#1a1a1d]"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-1 right-1 w-9 h-9 bg-surface dark:bg-[#252528] rounded-full border-2 border-white dark:border-[#1a1a1d] flex items-center justify-center shadow-lg text-primary"
            >
              <Camera size={16} />
            </motion.button>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-bold text-2xl tracking-tight text-on-surface dark:text-white">{currentUser?.name}</h2>
              {currentUser?.role === 'AgencyManager' && <ShieldCheck size={20} className="text-accent" />}
            </div>
            <p className="text-sm text-on-surface-variant font-medium">
              {currentUser?.role === 'AgencyManager' ? 'Gestionnaire d\'agence' : 'Membre EliteDrive Gold'}
            </p>
          </div>
        </section>

        {/* Role Switcher Action */}
        <section className="p-5 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                <SwitchCamera size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5 leading-none">Simulation</p>
                <p className="text-base font-bold dark:text-white">Changer de rôle</p>
              </div>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleRoleSwitch}
              className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20"
            >
              Passer en {currentUser?.role === 'Client' ? 'Manager' : 'Client'}
            </motion.button>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-[#1a1a1d] rounded-2xl border border-border dark:border-white/10 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Trajets</span>
            <span className="text-2xl font-bold text-on-surface dark:text-white">24</span>
          </div>
          <div className="p-4 bg-white dark:bg-[#1a1a1d] rounded-2xl border border-border dark:border-white/10 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Favoris</span>
            <span className="text-2xl font-bold text-on-surface dark:text-white">14</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <motion.div 
              key={item.id} 
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModal(item.id)}
              className="group cursor-pointer flex items-center justify-between p-4 rounded-2xl bg-surface dark:bg-white/5 hover:bg-border dark:hover:bg-white/10 transition-all duration-300 border border-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-white/10 shadow-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface dark:text-white">{item.label}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
            </motion.div>
          ))}
        </nav>

        {/* Logout */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="w-full py-4 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors flex items-center justify-center gap-2 border border-red-500/10"
        >
          <LogOut size={20} />
          Déconnexion
        </motion.button>
      </main>

      {/* Modals for Editing */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white dark:bg-[#1a1a1d] w-full max-w-md rounded-t-[32px] sm:rounded-3xl p-8 overflow-y-auto max-h-[85vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold dark:text-white">
                  {menuItems.find(i => i.id === activeModal)?.label}
                </h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface dark:bg-white/5 text-on-surface-variant"
                >
                  <X size={24} />
                </button>
              </div>

              {activeModal === 'personal' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 block">Nom complet</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                        <input 
                          type="text" 
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="w-full h-14 bg-surface dark:bg-white/5 rounded-xl pl-12 pr-4 border border-border dark:border-white/10 outline-none focus:border-primary transition-colors dark:text-white font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 block">Adresse Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                        <input 
                          type="email" 
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="w-full h-14 bg-surface dark:bg-white/5 rounded-xl pl-12 pr-4 border border-border dark:border-white/10 outline-none focus:border-primary transition-colors dark:text-white font-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Enregistrer les modifications
                  </motion.button>
                </div>
              )}

              {activeModal === 'payment' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-9 bg-white rounded-md flex items-center justify-center shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white">Visa Executive</p>
                        <p className="text-xs text-on-surface-variant">**** 4242</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                      <Check size={14} />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-2xl border border-border dark:border-white/10 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-9 bg-black rounded-md flex items-center justify-center">
                        <Apple size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white">Apple Pay</p>
                        <p className="text-xs text-on-surface-variant">Activé</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 border-2 border-dashed border-border dark:border-white/10 rounded-2xl text-on-surface-variant font-bold text-sm mt-4 flex items-center justify-center gap-2">
                    <Plus size={18} />
                    Ajouter une méthode
                  </button>
                </div>
              )}

              {activeModal === 'notifications' && (
                <div className="space-y-4">
                  {[
                    { label: 'Rappels de réservation', desc: 'Alertes 24h avant votre départ' },
                    { label: 'Offres exclusives', desc: 'Promotions EliteDrive Gold' },
                    { label: 'Messages des agences', desc: 'Alertes en temps réel pour vos demandes' }
                  ].map((notif, i) => (
                    <div key={i} className="flex items-center justify-between p-2">
                      <div className="max-w-[80%]">
                        <p className="font-bold dark:text-white">{notif.label}</p>
                        <p className="text-[10px] text-on-surface-variant">{notif.desc}</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'support' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <button className="flex items-center justify-between p-4 bg-surface dark:bg-white/5 rounded-xl font-bold dark:text-white text-sm">
                      Centre d'aide & FAQ
                      <ChevronRight size={18} />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-surface dark:bg-white/5 rounded-xl font-bold dark:text-white text-sm">
                      Contacter la Conciergerie 24/7
                      <Phone size={18} className="text-primary" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-surface dark:bg-white/5 rounded-xl font-bold dark:text-white text-sm">
                      Signaler un problème
                      <AlertCircle size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
