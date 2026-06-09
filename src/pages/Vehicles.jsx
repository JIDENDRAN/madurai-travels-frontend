import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Users, Info, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';

import { getVehicleImage } from '../utils/imageImports';

import KanyakumariBg from '../assets/kanyakumari_bg.png';
import ThirumalaiBg from '../assets/thirumalai_mahal_bg.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';

const bgMap = {
  'kanyakumari_bg.png': KanyakumariBg,
  'thirumalai_mahal_bg.png': ThirumalaiBg,
  'kodaikanal_bg.png': KodaikanalBg,
  'munnar_bg.png': MunnarBg,
  'rameswaram_bg.png': RameswaramBg
};

const getBgImage = (bgName) => {
  return bgMap[bgName] || KanyakumariBg;
};

const parseDesc = (desc) => {
  if (!desc) return null;
  
  if (!desc.includes('[Outstation Plan]') && !desc.includes('[Day Rental Plan]')) {
    return { isStructured: false, text: desc };
  }
  
  const result = {
    isStructured: true,
    outstation: {},
    dayRent: {}
  };
  
  const sections = desc.split(/\[(.*?)\]/);
  for (let i = 1; i < sections.length; i += 2) {
    const title = sections[i].trim();
    const content = sections[i + 1] || '';
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
    
    const target = title.includes('Outstation') ? result.outstation : result.dayRent;
    
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        target[key] = value;
      }
    });
  }
  
  return result;
};

const VehicleCard = ({ v, index }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '' });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const openBookingModal = (vehicle) => {
    setModalData({ isOpen: true, vehicle });
  };

  const parsed = parseDesc(v.desc);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col md:flex-row group hover:shadow-2xl transition-shadow relative"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
        className="md:w-2/5 h-64 md:h-auto min-h-[280px] overflow-hidden relative flex items-center justify-center p-6 select-none bg-slate-950"
      >
        <div className="absolute inset-0 bg-slate-800 z-0" />

        {/* Opaque 360 Rotating & Tilting Vehicle Image */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ rotateY: 360 }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
          className="w-full h-full relative flex items-center justify-center z-20"
        >
          <img src={getVehicleImage(v.image)} alt={v.name} className="h-64 object-contain z-20 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]" loading="lazy" onError={(e) => { e.target.src = getVehicleImage('toyota_etios-removebg-preview.png'); }} />
        </motion.div>

        <div className="absolute top-4 left-4 bg-slate-950 text-white px-4 py-1 rounded-full font-bold text-xs shadow-md z-20 border border-slate-700/30">
          {v.name}
        </div>
      </div>
      <div className="md:w-3/5 p-8 flex flex-col justify-between z-10 bg-white">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-poppins font-bold text-slate-900">{t(v.name)}</h2>
            <div className="text-right">
              <span className="block text-xs uppercase text-slate-400 font-bold tracking-wider">{t('Base Rate')}</span>
              <span className="text-2xl font-bold text-green-600">{v.price}</span>
            </div>
          </div>

          {/* Pricing Plans Grid */}
          {parsed && parsed.isStructured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Outstation Plan */}
              {Object.keys(parsed.outstation).length > 0 && (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-4 border border-slate-100/80 shadow-sm relative overflow-hidden group/plan hover:border-yellow-400/40 hover:from-white hover:to-white transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-full -mr-6 -mt-6 transition-transform group-hover/plan:scale-125 pointer-events-none" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    {t('Outstation Plan')}
                  </h4>
                  <div className="space-y-1.5">
                    {Object.entries(parsed.outstation).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">{t(key)}</span>
                        <span className="font-semibold text-slate-800 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/20">{t(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Day Rental Plan */}
              {Object.keys(parsed.dayRent).length > 0 && (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-4 border border-slate-100/80 shadow-sm relative overflow-hidden group/plan hover:border-green-400/40 hover:from-white hover:to-white transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/5 to-transparent rounded-full -mr-6 -mt-6 transition-transform group-hover/plan:scale-125 pointer-events-none" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {t('Day Rental Plan')}
                  </h4>
                  <div className="space-y-1.5">
                    {Object.entries(parsed.dayRent).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">{t(key)}</span>
                        <span className="font-semibold text-slate-800 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/20">{t(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-600 mb-6 text-lg">{t(v.desc)}</p>
          )}

          <div className="flex gap-4 mb-8">
            <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">{v.seats}</span>
            </div>
            <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex items-center gap-2">
              <span className="font-bold text-blue-400">❄️</span>
              <span className="font-medium text-slate-700">{v.ac}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => openBookingModal(v.name)} className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-colors flex justify-center items-center gap-2">
            {t('Book Now')} <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => setShowModal(true)} className="px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-900 hover:text-slate-900 transition-colors flex items-center justify-center">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl z-10"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <img src={getVehicleImage(v.image)} alt={v.name} className="h-32 object-contain mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-poppins text-slate-900">{t(v.name)}</h3>
                <span className="text-yellow-500 font-bold text-sm uppercase tracking-wider">{v.seats} | {v.ac}</span>
              </div>

              <div className="space-y-3.5 mb-8">
                {parsed && parsed.isStructured ? (
                  <div className="space-y-4">
                    {/* Outstation Plan */}
                    {Object.keys(parsed.outstation).length > 0 && (
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                          {t('Outstation Plan')}
                        </h4>
                        <div className="space-y-1">
                          {Object.entries(parsed.outstation).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">{t(key)}</span>
                              <span className="font-semibold text-slate-800">{t(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Day Rental Plan */}
                    {Object.keys(parsed.dayRent).length > 0 && (
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          {t('Day Rental Plan')}
                        </h4>
                        <div className="space-y-1">
                          {Object.entries(parsed.dayRent).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">{t(key)}</span>
                              <span className="font-semibold text-slate-800">{t(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{t(v.desc)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">{t('Fully Sanitized & Cleaned')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">{t('Professional Verified Driver')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">{t('GPS Tracking Enabled')}</span>
                </div>
              </div>

              <button onClick={() => openBookingModal(v.name)} className="w-full bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl hover:bg-yellow-500 transition-colors">
                {t('Book')} {t(v.name)}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultVehicle={modalData.vehicle}
      />
    </motion.div>
  );
};

const Vehicles = () => {
  const { t } = useTranslation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'AW-18225094695', {
        page_path: window.location.pathname,
      });
    }
  }, []);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load fleet:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-poppins font-bold text-slate-900 mb-6"
          >
            {t('Our Fleet')}
          </motion.h1>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('Choose from our wide range of well-maintained vehicles for your journey.')}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Loading vehicles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {cars.map((v, i) => (
              <VehicleCard v={v} index={i} key={v.id || i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
