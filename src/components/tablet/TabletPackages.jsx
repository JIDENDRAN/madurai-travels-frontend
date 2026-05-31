import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Clock, ArrowRight, Info } from 'lucide-react';
import API_BASE_URL from '../../apiConfig';
import BookingModal from '../BookingModal';
import { getPackageImage } from '../../utils/imageImports';

const defaultPackages = [
  { name: 'Madurai Local Tour', duration: '8 Hours / 80 KM', places: 'Meenakshi Temple, Thirumalai Nayakkar Mahal, Gandhi Museum', price: '₹2600', image: 'meenakshi_bg.png' },
  { name: 'Rameswaram Tour', duration: '12 Hours / 420 KM', places: 'Ramanathaswamy Temple, Dhanushkodi, Agniteertham, Pamban Bridge', price: '₹6000', image: 'rameswaram_bg.png' },
  { name: 'Kodaikanal Tour', duration: '12 Hours / 300 KM', places: 'Kodaikanal Lake, Coaker\'s Walk, Bryant Park, Pine Forest, Pillar Rocks', price: '₹5000', image: 'kodaikanal_bg.png' },
  { name: 'Ooty Tour', duration: '2 Days / 600 KM', places: 'Ooty Lake, Botanical Garden, Doddabetta Peak, Pykara Falls', price: '₹11000', image: 'ooty_bg.png' }
];

export default function TabletPackages() {
  const { t } = useTranslation();
  const [packages, setPackages] = useState(defaultPackages);
  const [modalData, setModalData] = useState({ isOpen: false, packageType: '' });
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setPackages(data);
      })
      .catch(err => console.error('Failed to load packages for tablet:', err));
  }, []);

  const openBookingModal = (pkgName) => {
    setModalData({ isOpen: true, packageType: pkgName });
  };

  return (
    <section className="py-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-poppins font-bold mb-2">
            {t('Popular Tour Packages')}
          </h2>
          <div className="w-16 h-1 bg-yellow-405 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">{t('Explore the beauty of South India with our specially curated tour packages.')}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 items-stretch">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg hover:border-yellow-400/40 transition-all duration-300">
              <div className="h-44 overflow-hidden relative bg-slate-950 flex items-center justify-center p-2">
                <img
                  src={getPackageImage(pkg.image)}
                  alt={pkg.name}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-glass"
                />
                <div className="absolute top-3 right-3 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-750 text-[11px] font-bold text-yellow-400">
                  {pkg.price}
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{t(pkg.name)}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-yellow-400 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t(pkg.duration)}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-slate-300 leading-relaxed mb-4">
                    <Map className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    <p className="line-clamp-2">{t(pkg.places)}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-700/50 mt-auto">
                  <button
                    onClick={() => setSelectedDetails(pkg)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    <span>{t('View Details')}</span>
                  </button>
                  <button
                    onClick={() => openBookingModal(pkg.name)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold rounded-lg text-xs"
                  >
                    <span>{t('Book')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package details modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70" onClick={() => setSelectedDetails(null)}></div>
          <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10 text-left text-white">
            <button onClick={() => setSelectedDetails(null)} className="absolute top-3 right-3 text-slate-400 hover:text-white">✕</button>
            <h3 className="text-xl font-bold mb-3">{t(selectedDetails.name)}</h3>
            <div className="h-40 overflow-hidden rounded-xl bg-slate-900 p-2 flex items-center justify-center mb-4">
              <img src={getPackageImage(selectedDetails.image)} alt={selectedDetails.name} className="max-h-full max-w-full object-contain rounded shadow-lg" />
            </div>
            <div className="space-y-3 text-sm text-slate-300 mb-5">
              <p><strong>Duration:</strong> {selectedDetails.duration}</p>
              <p><strong>Highlights:</strong> {selectedDetails.places}</p>
              <p><strong>Cost:</strong> <span className="text-yellow-400 font-bold">{selectedDetails.price}</span></p>
            </div>
            <button
              onClick={() => {
                const name = selectedDetails.name;
                setSelectedDetails(null);
                openBookingModal(name);
              }}
              className="w-full bg-yellow-400 text-slate-900 font-bold py-2.5 rounded-xl hover:bg-yellow-500 transition-colors text-sm"
            >
              Book Package
            </button>
          </div>
        </div>
      )}

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultPackage={modalData.packageType}
      />
    </section>
  );
}
