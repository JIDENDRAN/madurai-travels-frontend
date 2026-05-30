import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Clock, ArrowRight, X, Sparkles } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';

import HeroBg from '../assets/hero.png';
import MaduraiAerialBg from '../assets/madurai_aerial_bg.png';
import MeenakshiBg from '../assets/meenakshi_bg.png';
import ThirumalaiBg from '../assets/thirumalai_mahal_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import OotyBg from '../assets/ooty_bg.png';
import KanyakumariBg from '../assets/kanyakumari_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import ThanjavurBg from '../assets/thanjavur_bg.png';

// Import image helper
import { getPackageImage } from '../utils/imageImports';

// Remove local pkgImgMap and getPkgImage definitions


const Packages = () => {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({ isOpen: false, packageType: '' });
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load packages:', err);
        setLoading(false);
      });
  }, []);

  const openBookingModal = (pkgName) => {
    setModalData({ isOpen: true, packageType: pkgName });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-poppins font-bold text-slate-900 mb-6"
          >
            {t('Tour Packages')}
          </motion.h1>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('Explore the beauty of South India with our specially curated tour packages.')}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Loading tour packages...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={pkg.id || i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 group flex flex-col"
              >
                <motion.div
                  className="relative h-64 rounded-t-3xl overflow-hidden bg-gray-100"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getPackageImage(pkg.image)})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-3xl" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-sm text-slate-900">
                    {pkg.price}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-poppins font-bold">{t(pkg.name)}</h3>
                  </div>
                </motion.div>

                <motion.div
                  className="p-6 flex flex-col flex-grow space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-slate-500 bg-slate-100 p-4 rounded-xl border border-slate-200">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-base">{t(pkg.duration)}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Map className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-slate-600 leading-relaxed line-clamp-3">{t(pkg.places)}</p>
                  </div>
                  <div className="text-3xl font-bold text-yellow-500 mt-2">{pkg.price}</div>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex gap-4">
                    <button onClick={() => openBookingModal(pkg.name)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-colors">
                      {t('Book Now')} <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => setSelectedDetails(pkg)} className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium py-3.5 rounded-xl">
                      {t('View Details')}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Sweet Details Modal */}
      <AnimatePresence>
        {selectedDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetails(null)}
              className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl z-10 border border-slate-150"
            >
              <button
                onClick={() => setSelectedDetails(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-yellow-500 mb-2">
                <Sparkles className="w-5 h-5 fill-current" />
                <span className="font-poppins font-bold text-xs uppercase tracking-wider">Premium Experience Details</span>
              </div>

              <h3 className="text-3xl font-poppins font-black text-slate-900 mb-4">{t(selectedDetails.name)}</h3>

              <div className="h-48 overflow-hidden rounded-2xl mb-6 relative">
                <img
                  src={getPackageImage(selectedDetails.image)}
                  alt={selectedDetails.name}
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-xl border border-slate-700 text-white font-bold text-sm">
                  Starting at {selectedDetails.price}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 bg-slate-55 px-4 py-3.5 rounded-xl border border-slate-100">
                  <Clock className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span className="font-semibold text-slate-750">{selectedDetails.duration}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block text-xs uppercase text-slate-400 font-bold tracking-wider mb-2">Itinerary Highlights</span>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    {selectedDetails.places}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const pkgName = selectedDetails.name;
                  setSelectedDetails(null);
                  openBookingModal(pkgName);
                }}
                className="w-full bg-slate-900 text-white hover:bg-yellow-400 hover:text-slate-900 transition-colors font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                Book This Tour <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultPackage={modalData.packageType}
      />
    </div>
  );
};

export default Packages;
