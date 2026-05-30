import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneCall, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/MaduraiTaxiLogo.png';
import MeenakshiDesktop from '../../assets/meenakshi_desktop.png';
import ThirumalaiDesktop from '../../assets/thirumalai_desktop.png';
import RameswaramDesktop from '../../assets/rameswaram_desktop.png';

export default function TabletHero() {
  const { t } = useTranslation();
  const [bgIndex, setBgIndex] = useState(0);

  const images = [
    MeenakshiDesktop,
    ThirumalaiDesktop,
    RameswaramDesktop
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-[60vh] md:h-[50vh] lg:h-[60vh] flex items-center bg-slate-950 text-white overflow-hidden py-10 px-8">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={bgIndex}
            src={images[bgIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full object-cover object-center"
            alt="South India Destination"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 items-center">
        {/* Left Column: Headings and Info */}
        <div className="col-span-7 flex flex-col items-start text-left space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-yellow-400/50 text-yellow-400 font-bold text-xs uppercase tracking-wider">
            ⭐ {t('Premium Taxi Service')}
          </div>
          
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="h-14 w-auto object-contain bg-white/10 p-1 rounded-xl" />
            <h1 className="text-3xl lg:text-4xl font-poppins font-black leading-none uppercase tracking-tight">
              <span className="text-yellow-400">MADURAI</span><br />
              <span className="text-white">{t('Tour Taxi')}</span>
            </h1>
          </div>

          <p className="text-base text-slate-200 font-medium leading-relaxed max-w-md drop-shadow-md">
            {t('Safe & Comfortable Taxi Service in Madurai. Enjoy custom outstation tours, airport taxi service, and local temple packages at affordable rates.')}
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-900/75 px-3 py-1.5 rounded-lg border border-white/10 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>{t('Safe Drivers')}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/75 px-3 py-1.5 rounded-lg border border-white/10 font-bold">
              <Navigation className="w-3.5 h-3.5 text-yellow-400" />
              <span>{t('GPS Tracking')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: CTA & Quick Actions */}
        <div className="col-span-5 flex flex-col space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
          <h3 className="text-lg font-poppins font-black text-yellow-400 text-center tracking-wide uppercase">
            {t('Book Your Journey')}
          </h3>
          <button
            onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold py-3 px-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-98 transition-all text-sm font-poppins cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            {t('BOOK NOW')}
          </button>
          
          <div className="flex flex-col space-y-2">
            <a
              href="tel:9629373701"
              className="flex items-center justify-center gap-2 bg-slate-900/90 text-white py-2.5 px-4 rounded-xl text-xs font-bold border border-white/10 transition-colors hover:bg-slate-800"
            >
              <PhoneCall className="w-4 h-4 text-yellow-400" />
              <span>{t('Call Us')}: +91 96293 73701</span>
            </a>
            <a
              href="https://wa.me/919629373701"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600/90 text-white py-2.5 px-4 rounded-xl text-xs font-bold border border-green-500/20 transition-colors hover:bg-green-700"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('Chat on WhatsApp')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
