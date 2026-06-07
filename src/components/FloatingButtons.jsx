import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  const adminNumber = '8667520367';
  const whatsappUrl = `https://wa.me/91${adminNumber}?text=Hello%2C%20I%20want%20to%20book%20a%20taxi%20with%20Madurai%20Tour%20Taxi.`;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-4">
      {/* Call Button */}
      <a
        href={`tel:${adminNumber}`}
        className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(250,204,21,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 border border-yellow-300/20 group hover:-translate-y-1"
        title="Call Admin"
      >
        <Phone className="w-6 h-6 animate-pulse" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call +91 {adminNumber}
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(34,197,94,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 border border-green-400/20 group hover:-translate-y-1"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
