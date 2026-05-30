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
import imgAlagar from '../../assets/gallery/51887.jpg.jpeg';
import imgThirumalai from '../../assets/gallery/51893.jpg.jpeg';
import imgRameswaram from '../../assets/gallery/51904.png';
import imgKodaikanal from '../../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.12 PM.jpeg';
import imgOoty from '../../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.14 PM.jpeg';
import imgKanyakumari from '../../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.16 PM.jpeg';
import imgCustomers from '../../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.18 PM.jpeg';

// Import a hero background image
import heroBg from '../../assets/meenakshi_mobile.png';

export default function MobileGallery() {
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

  // Filtering logic
  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const filters = [
    { id: 'all', name: 'All', icon: <Image className="w-3.5 h-3.5" /> },
    { id: 'temple', name: 'Temple Tours', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'hills', name: 'Hill Stations', icon: <Mountain className="w-3.5 h-3.5" /> },
    { id: 'heritage', name: 'Heritage Places', icon: <Building className="w-3.5 h-3.5" /> },
    { id: 'outstation', name: 'Outstation Trips', icon: <Map className="w-3.5 h-3.5" /> },
    { id: 'vehicles', name: 'Vehicles', icon: <Car className="w-3.5 h-3.5" /> },
    { id: 'customers', name: 'Happy Customers', icon: <Smile className="w-3.5 h-3.5" /> }
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
    <div className="bg-slate-50 min-h-screen pb-12 font-roboto overflow-hidden select-none">
      {/* 1. Mobile Hero */}
      <div className="relative h-[32vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Madurai Travels Gallery" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-sm mt-2">
          <p className="font-['Dancing_Script'] text-2xl text-yellow-400 font-bold mb-1">
            {t('Our Gallery')}
          </p>
          <h1 className="text-2xl font-poppins font-black text-white uppercase tracking-wide">
            {t('Memories from Our Journeys')}
          </h1>
          <div className="w-16 h-0.5 bg-yellow-400 mx-auto my-2 rounded-full" />
          <p className="text-[11px] text-slate-300 font-light leading-relaxed">
            {t('Glimpses of beautiful destinations and happy moments with our travelers.')}
          </p>
        </div>
      </div>

      {/* 2. Swipable Filters */}
      <div className="px-4 mt-6 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setSelectedImageIndex(null);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-poppins font-semibold text-[11px] transition-all shrink-0 border ${
                  isActive 
                    ? 'bg-yellow-400 text-slate-900 border-yellow-400 shadow-sm shadow-yellow-400/10' 
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <span className={isActive ? 'text-slate-900' : 'text-slate-400'}>{filter.icon}</span>
                <span>{t(filter.name)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Stacked Grid (1 Column for Mobile) */}
      <div className="px-4">
        <div className="flex flex-col gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative h-[180px] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-slate-950"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Instagram CTA */}
      <div className="px-4 mt-8">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-5.5 h-5.5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-poppins font-black text-slate-800">
              {t('Want to share your travel moments with us?')}
            </h4>
            <p className="text-slate-600 text-[10px] mt-0.5">
              {t('Tag us on Instagram')} <span className="text-yellow-600 font-bold">@madurai.travels</span>
            </p>
          </div>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-slate-900 text-white font-poppins font-bold px-5 py-2.5 rounded-xl shadow text-[10px] cursor-pointer w-full"
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

      {/* 5. Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 z-[110] bg-white/10 text-white p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Container */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full flex flex-col items-center"
            >
              <div className="relative max-h-[50vh] rounded-xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center bg-slate-900 w-full">
                <img 
                  src={filteredItems[selectedImageIndex].image} 
                  alt={filteredItems[selectedImageIndex].title}
                  className="max-h-[50vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Navigation Arrows for Mobile */}
              <div className="flex gap-6 mt-4 z-[110]">
                <button 
                  onClick={handlePrev}
                  className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full cursor-pointer border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full cursor-pointer border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full text-center mt-4 text-white px-2">
                <div className="inline-flex items-center gap-1 opacity-80 justify-center">
                  <MapPin className="w-3 h-3 text-yellow-400" />
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-300">
                    {t(filteredItems[selectedImageIndex].location)}
                  </span>
                </div>
                <h2 className="text-lg font-poppins font-black mt-1 text-yellow-400">
                  {t(filteredItems[selectedImageIndex].title)}
                </h2>
                {filteredItems[selectedImageIndex].desc && (
                  <p className="text-slate-300 text-[10px] font-light leading-relaxed mt-2 max-w-xs mx-auto">
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
}
