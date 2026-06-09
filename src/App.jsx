// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ResponsiveLayout from './components/ResponsiveLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Logo from './assets/MaduraiTaxiLogo.png';
import FloatingButtons from './components/FloatingButtons';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Track page views on route change for Google Tag
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'AW-18225094695', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <div className="app-wrapper">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-[3px] border-t-yellow-400 border-r-transparent border-b-green-500 border-l-transparent shadow-[0_0_40px_rgba(250,204,21,0.15)]"
                />
                <motion.img
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.85, 1, 0.85], opacity: 1 }}
                  transition={{
                    scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.6 },
                  }}
                  src={Logo}
                  alt="Madurai Tour Taxi Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-8 flex flex-col items-center text-center px-4"
              >
                <h2 className="font-poppins font-black text-2xl tracking-wider text-white">
                  MADURAI <span className="text-yellow-400">TOUR TAXI</span>
                </h2>
                <p className="text-xs text-slate-400 tracking-widest mt-1.5 uppercase font-semibold">
                  Premium Travel Experience
                </p>
              </motion.div>
              <div className="w-56 h-1 bg-slate-800/80 backdrop-blur-md rounded-full mt-8 overflow-hidden relative border border-slate-700/30">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-green-500 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col font-roboto text-slate-800 bg-slate-50">
        <main className="flex-grow">
          {isAdminRoute ? (
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          ) : (
            <ResponsiveLayout />
          )}
        </main>
        {!isAdminRoute && <FloatingButtons />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
