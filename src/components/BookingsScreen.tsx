import React from 'react';
import { ArrowLeft, Settings, Calendar, Clock } from 'lucide-react';
import { MOCK_BOOKINGS } from '../data';

export default function BookingsScreen() {
  return (
    <div className="pb-32">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 h-16">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 transition-colors active:scale-95">
            <ArrowLeft size={20} className="text-slate-500" />
          </button>
          <h1 className="font-bold text-lg tracking-tight text-slate-900">Bookings</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 transition-colors active:scale-95">
            <Settings size={20} className="text-slate-500" />
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Rental History</h2>
          <p className="text-on-surface-variant font-medium">Manage your active and past reservations.</p>
        </div>

        <div className="space-y-6">
          {MOCK_BOOKINGS.map((booking) => (
            <div key={booking.id} className={`bg-white rounded-3xl shadow-[0_12px_32px_rgba(26,28,31,0.06)] overflow-hidden group ${booking.status === 'Cancelled' ? 'opacity-80' : ''}`}>
              <div className="relative h-48 w-full overflow-hidden bg-surface-container-low">
                <img 
                  src={booking.carImage} 
                  alt={booking.carName}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${booking.status === 'Cancelled' ? 'grayscale' : ''}`}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                    booking.status === 'Upcoming' ? 'bg-primary-container text-white' :
                    booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-error-container text-on-error-container'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">{booking.carName}</h3>
                    <p className="text-xs text-on-surface-variant font-medium">Confirmation: {booking.confirmationNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className={`block text-xl font-extrabold ${booking.status === 'Cancelled' ? 'text-on-surface-variant line-through' : 'text-primary'}`}>
                      ${booking.totalPrice.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                      {booking.status === 'Cancelled' ? 'Refunded' : 'Total Price'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-4 border-t border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
                      <Calendar size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">Pickup</p>
                      <p className="text-sm font-bold">{booking.pickupDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
                      <Clock size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">Return</p>
                      <p className="text-sm font-bold">{booking.returnDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
