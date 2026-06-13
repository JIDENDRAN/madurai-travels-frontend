import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Mountain, 
  Compass, 
  Building, 
  Map, 
  Car, 
  Smile
} from 'lucide-react';

// Static imports of the 8 images from the gallery folder
import imgMeenakshi from '../../assets/gallery/51714.png';
import imgAlagar from '../../assets/gallery/51887.jpeg';
import imgThirumalai from '../../assets/gallery/51893.jpeg';
import imgRameswaram from '../../assets/gallery/51904.png';
import imgKodaikanal from '../../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.12 PM.jpeg';
import imgOoty from '../../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.14 PM.jpeg';
import imgKanyakumari from '../../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.16 PM.jpeg';
import imgCustomers from '../../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.18 PM.jpeg';

// Import a hero background image
import heroBg from '../../assets/meenakshi_desktop.png';

const TabletGallery = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Gallery items
  const galleryItems = [
    {
      id: 1,
      title: 'Meenakshi Amman Temple',
      location: 'Madurai',
      category: 'temple',
      image: imgMeenakshi,
      desc: 'An architectural marvel and a spiritual beacon of South India.'
    },
    {
      id: 2,
      title: 'Alagar Kovil',
      location: 'Madurai',
      category: 'temple',
      image: imgAlagar,
      desc: 'A historic temple dedicated to Lord Vishnu, nestled at the foot of Alagar Hills.'
    },
    {
      id: 3,
      title: 'Thirumalai Nayakkar Mahal',
      location: 'Madurai',
      category: 'heritage',
      image: imgThirumalai,
      desc: 'A magnificent 17th-century palace showcasing Indo-Saracenic architecture.'
    },
    {
      id: 4,
      title: 'Rameswaram Temple',
      location: 'Rameswaram',
      category: 'temple',
      image: imgRameswaram,
      desc: 'One of the twelve sacred Jyotirlinga temples with spectacular corridors.'
    },
    {
      id: 5,
      title: 'Kodaikanal Hills',
      location: 'Kodaikanal',
      category: 'hills',
      image: imgKodaikanal,
      desc: 'Mist-clad mountains, deep valleys, and beautiful pine forests.'
    },
    {
      id: 6,
      title: 'Ooty Tea Gardens',
      location: 'Ooty',
      category: 'hills',
      image: imgOoty,
      desc: 'Vibrant green tea plantations sprawling across the scenic slopes of Nilgiri Hills.'
    },
    {
      id: 7,
      title: 'Kanyakumari Sunset',
      location: 'Kanyakumari',
      category: 'outstation',
      image: imgKanyakumari,
      desc: 'The spectacular confluence of three seas meeting under a magical sunset sky.'
    },
    {
      id: 8,
      title: 'Our Happy Customers',
      location: 'Customer Diaries',
      category: 'customers',
      image: imgCustomers,
      desc: 'Creating golden memories and providing safe journeys for families.'
    }
  ];

  // Filtering
  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const filters = [
    { id: 'all', name: 'All', icon: <Image className="w-4 h-4" /> },
    { id: 'temple', name: 'Temple Tours', icon: <Compass className="w-4 h-4" /> },
    { id: 'hills', name: 'Hill Stations', icon: <Mountain className="w-4 h-4" /> },
    { id: 'heritage', name: 'Heritage Places', icon: <Building className="w-4 h-4" /> },
    { id: 'outstation', name: 'Outstation Trips', icon: <Map className="w-4 h-4" /> },
    { id: 'vehicles', name: 'Vehicles', icon: <Car className="w-4 h-4" /> },
    { id: 'customers', name: 'Happy Customers', icon: <Smile className="w-4 h-4" /> }
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16 font-roboto overflow-hidden select-none">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Madurai Travels Gallery" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/75 to-slate-950/90" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto mt-4">
          <p className="font-['Dancing_Script'] text-3xl text-yellow-400 font-bold mb-2">
            {t('Our Gallery')}
          </p>
          <h1 className="text-3xl md:text-4xl font-poppins font-black text-white uppercase drop-shadow-md">
            {t('Memories from Our Journeys')}
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto my-3 rounded-full" />
          <p className="text-sm text-slate-200 font-light">
            {t('Glimpses of beautiful destinations and happy moments with our travelers.')}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mt-8 mb-10">
        <div className="flex items-center justify-start overflow-x-auto pb-3 scrollbar-none gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setSelectedImageIndex(null);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-poppins font-semibold text-xs transition-all shrink-0 border ${
                  isActive 
                    ? 'bg-yellow-400 text-slate-900 border-yellow-400 shadow-md shadow-yellow-400/10' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-slate-900' : 'text-slate-400'}>{filter.icon}</span>
                <span>{t(filter.name)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid - 2 columns for tablet view */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative h-[220px] rounded-3xl overflow-hidden cursor-pointer shadow-md bg-slate-950"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div>
              <h4 className="text-base font-poppins font-black text-slate-800">
                {t('Want to share your travel moments with us?')}
              </h4>
              <p className="text-slate-600 text-xs mt-0.5">
                {t('Tag us on Instagram')} <span className="text-yellow-600 font-bold">@madurai.travels</span>
              </p>
            </div>
          </div>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-poppins font-bold px-6 py-3 rounded-xl shadow text-xs shrink-0 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>{t('Follow Us')}</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <button 
              onClick={handlePrev}
              className="absolute left-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors cursor-pointer border border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors cursor-pointer border border-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full flex flex-col items-center"
            >
              <div className="relative max-h-[60vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-slate-900">
                <img 
                  src={filteredItems[selectedImageIndex].image} 
                  alt={filteredItems[selectedImageIndex].title}
                  className="max-h-[60vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="w-full text-center mt-5 text-white max-w-xl px-4">
                <div className="inline-flex items-center gap-1 opacity-80">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-slate-300">
                    {t(filteredItems[selectedImageIndex].location)}
                  </span>
                </div>
                <h2 className="text-xl font-poppins font-black mt-1 text-yellow-400">
                  {t(filteredItems[selectedImageIndex].title)}
                </h2>
                {filteredItems[selectedImageIndex].desc && (
                  <p className="text-slate-300 text-xs font-light leading-relaxed mt-2 max-w-md mx-auto">
                    {t(filteredItems[selectedImageIndex].desc)}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TabletGallery;
