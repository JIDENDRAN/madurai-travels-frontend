import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Map, ArrowRight, X, Sparkles } from 'lucide-react';
import API_BASE_URL from '../../apiConfig';
import InlineBookingForm from '../InlineBookingForm';
import { getPackageImage } from '../../utils/imageImports';

export default function MobilePackages({ hideForm }) {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [bookingPackage, setBookingPackage] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => { setPackages(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleBookNow = (pkgName) => {
    if (hideForm) {
      window.dispatchEvent(new CustomEvent('select-booking-item', { detail: { package: pkgName } }));
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setBookingPackage(pkgName);
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-poppins font-bold text-slate-900 mb-2">{t('Tour Packages')}</h1>
          <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full mb-2"></div>
          <p className="text-xs text-slate-500">{t('Explore the beauty of South India with our specially curated tour packages.')}</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Loading...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {packages.map((pkg, i) => (
              <div key={pkg.id || i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img src={getPackageImage(pkg.image)} alt={pkg.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow text-xs font-bold text-slate-900">
                    {pkg.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-poppins font-bold text-slate-900 mb-2">{t(pkg.name)}</h3>
                  <div className="flex items-center gap-2 mb-2 text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 text-xs">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{t(pkg.duration)}</span>
                  </div>
                  <div className="flex items-start gap-2 mb-4">
                    <Map className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{t(pkg.places)}</p>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleBookNow(pkg.name)}
                      className="flex-1 bg-yellow-400 text-slate-900 font-bold py-2.5 rounded-xl text-xs flex justify-center items-center gap-1 active:bg-yellow-500"
                    >
                      {t('Book Now')} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedDetails(pkg)}
                      className="px-3 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-xs active:border-slate-900"
                    >
                      {t('View Details')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedDetails(null)} />
          <div className="relative bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl z-10">
            <button onClick={() => setSelectedDetails(null)} className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-900 rounded-full">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-yellow-500 mb-2">
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="font-poppins font-bold text-[10px] uppercase tracking-wider">Premium Experience</span>
            </div>
            <h3 className="text-xl font-poppins font-bold text-slate-900 mb-3">{t(selectedDetails.name)}</h3>
            <div className="h-36 rounded-xl overflow-hidden mb-4 relative">
              <img src={getPackageImage(selectedDetails.image)} alt={selectedDetails.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold text-xs border border-slate-700">
                Starting at {selectedDetails.price}
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                <Clock className="w-4 h-4 text-yellow-500" /> {selectedDetails.duration}
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="block text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Itinerary</span>
                <p className="text-slate-700 text-xs leading-relaxed">{selectedDetails.places}</p>
              </div>
            </div>
            <button
              onClick={() => { const n = selectedDetails.name; setSelectedDetails(null); handleBookNow(n); }}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1 active:bg-yellow-400 active:text-slate-900"
            >
              Book This Tour <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {!hideForm && (
        <InlineBookingForm defaultPackage={bookingPackage} />
      )}
    </div>
  );
}
