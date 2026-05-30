import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../../assets/MaduraiTaxiLogo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Packages', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 glassmorphic-premium ${isScrolled
      ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-lg'
      : 'bg-white border-b border-slate-100 shadow-md'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <motion.img src={Logo} alt="Madurai Tour Taxi"
              className="h-12 lg:h-16 w-auto object-contain drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]"
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="flex flex-col">
              <span className="font-poppins font-black text-lg lg:text-2xl leading-none bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(250,204,21,0.3)]">MADURAI</span>
              <span className="font-poppins font-bold text-sm lg:text-xl leading-none text-slate-800 group-hover:text-yellow-600 transition-colors">TOUR TAXI</span>
            </div>
          </Link>

          {/* Right Section: Language + Nav + Admin */}
          <div className="ml-auto flex items-center space-x-3 lg:space-x-6 xl:space-x-8">
            {/* Language selector */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 bg-white shadow-sm"
              >
                <span>{languages.find(l => l.code === i18n.language)?.label || 'English'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-slate-100 z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="block w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Navigation links */}
            <div className="flex items-center space-x-1 lg:space-x-3 xl:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs lg:text-sm font-bold text-slate-700 hover:text-yellow-600 transition-all px-2 lg:px-3 py-2 hover:bg-yellow-50/50 rounded-lg"
                >
                  {t(link.name)}
                </Link>
              ))}
            </div>

            {/* Admin Link */}
            <Link
              to="/admin/dashboard"
              className="text-slate-700 hover:text-yellow-500 transition-colors flex items-center justify-center bg-slate-100 hover:bg-yellow-55 w-9 h-9 lg:w-10 lg:h-10 rounded-full shadow-sm"
              title="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5" />
            </Link>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
