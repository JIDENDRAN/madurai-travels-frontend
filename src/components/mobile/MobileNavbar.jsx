import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/MaduraiTaxiLogo.png';

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const toggleDrawer = () => setOpen(!open);
  const changeLanguage = (e) => i18n.changeLanguage(e.target.value);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Packages', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Madurai Taxi" className="h-12 w-auto object-contain" />
          <div className="flex flex-col text-left">
            <span className="font-poppins font-black text-2xl leading-none bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              MADURAI
            </span>
            <span className="font-poppins font-bold text-1xl leading-none text-slate-700">
              TOUR TAXI
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <select
            onChange={changeLanguage}
            value={i18n.language}
            className="border border-slate-200 rounded-full text-xs font-semibold px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-slate-700 shadow-sm cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="ta">TA</option>
            <option value="hi">HI</option>
          </select>

          {/* Hamburger menu right */}
          <button
            onClick={toggleDrawer}
            className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Drawer Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-[101] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <span className="font-poppins font-black text-lg text-slate-800 tracking-wider">
                    MADURAI <span className="text-yellow-500">TAXI</span>
                  </span>
                  <button
                    onClick={toggleDrawer}
                    className="p-1.5 rounded-lg bg-slate-50 text-slate-550 hover:bg-slate-100 transition-colors"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={toggleDrawer}
                      className="text-base font-bold text-slate-700 hover:text-yellow-500 transition-colors py-2 px-3 hover:bg-slate-50 rounded-xl"
                    >
                      {t(link.name)}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Admin Link at the bottom of drawer */}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/admin/dashboard"
                  onClick={toggleDrawer}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-yellow-50 text-slate-700 font-bold rounded-xl transition-all"
                >
                  <ShieldCheck className="w-5 h-5 text-yellow-500" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
