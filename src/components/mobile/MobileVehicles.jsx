import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Wind, Music, Info, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../../apiConfig';
import InlineBookingForm from '../InlineBookingForm';
import { getVehicleImage, getBgImage } from '../../utils/imageImports';

const defaultVehicles = [
  {
    name: 'Swift Dzire',
    seats: '4 Seater',
    ac: 'AC',
    price: '₹13/km',
    desc: '[Outstation Plan]\nRate: ₹13/km\nMin Distance: Above 300 km\nDriver Charge: ₹300/day\n\n[Day Rental Plan]\nDistance Limit: Up to 250 km\nBase Rent: ₹1500\nPer km Charge: ₹10/km\nDriver Charge: ₹300',
    image: 'sedan_cab-removebg-preview.png',
    bgImage: 'kanyakumari_bg.png'
  },
  {
    name: 'Maruti Ciaz Premium Sedan',
    seats: '4 Seater',
    ac: 'AC',
    price: '₹13/km',
    desc: '[Outstation Plan]\nRate: ₹13/km\nMin Distance: Above 250 km\nDriver Charge: ₹300/day\n\n[Day Rental Plan]\nBase Rent: ₹1500/day\nPer km Charge: ₹10/km',
    image: 'sedan_cab-removebg-preview.png',
    bgImage: 'munnar_bg.png'
  },
  {
    name: 'Prime SUV',
    seats: '7 Seater',
    ac: 'AC',
    price: '₹18/km',
    desc: '[Outstation Plan]\nRate: ₹18/km\nMin Distance: Above 300 km\nDriver Charge: ₹400/day\n\n[Day Rental Plan]\nBase Rent: ₹2300/day\nPer km Charge: ₹13/km\nDriver Charge: ₹400/day',
    image: 'suv-removebg-preview.png',
    bgImage: 'thirumalai_mahal_bg.png'
  },
  {
    name: 'Innova Crysta',
    seats: '7 Seater',
    ac: 'AC',
    price: '₹22/km',
    desc: '[Outstation Plan]\nRate: ₹22/km\nMin Distance: Above 300 km\nDriver Charge: ₹500/day\n\n[Day Rental Plan]\nBase Rent: ₹2700/day\nPer km Charge: ₹17/km',
    image: 'innova_crysta-removebg-preview.png',
    bgImage: 'kodaikanal_bg.png'
  },
  {
    name: 'Tempo Traveller (12 Seater)',
    seats: '12 Seater',
    ac: 'AC',
    price: '₹25/km',
    desc: '[Outstation Plan]\nRate: ₹25/km\nMin Distance: Above 350 km\n\n[Day Rental Plan]\nBase Rent: ₹2800/day\nPer km Charge: ₹18/km',
    image: 'tempo_traveller-removebg-preview.png',
    bgImage: 'rameswaram_bg.png'
  },
  {
    name: 'Tempo Traveller (18 Seater)',
    seats: '18 Seater',
    ac: 'AC',
    price: '₹30/km',
    desc: '[Outstation Plan]\nRate: ₹30/km\nMin Distance: Above 300 km\n\n[Day Rental Plan]\nBase Rent: ₹3900/day\nPer km Charge: ₹22/km',
    image: 'tempo_traveller-removebg-preview.png',
    bgImage: 'ooty_bg.png'
  }
];

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

export default function MobileVehicles({ hideForm }) {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState(defaultVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingVehicle, setBookingVehicle] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setVehicles(data);
      })
      .catch(err => console.error('Failed to load fleet for mobile:', err));
  }, []);

  const handleBookNow = (vehicleName) => {
    if (hideForm) {
      window.dispatchEvent(new CustomEvent('select-booking-item', { detail: { vehicle: vehicleName } }));
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setBookingVehicle(vehicleName);
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-poppins font-black text-slate-900 mb-1">
            {t('Our Premium Vehicles')}
          </h2>
          <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="mt-2 text-slate-500 text-xs max-w-xs mx-auto">{t('Choose from our well-maintained vehicles.')}</p>
        </div>

        <div className="space-y-6">
          {vehicles.map((vehicle, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden flex flex-col justify-between">
              <div className="h-40 overflow-hidden relative flex items-center justify-center p-4 bg-slate-950">
                <div className="absolute inset-0 bg-slate-800 z-0" />
                <img
                  src={getVehicleImage(vehicle.image)}
                  alt={vehicle.name}
                  className="h-28 w-auto object-contain z-10 filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
                />
                <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-white border border-white/10 z-20">
                  {vehicle.seats}
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{t(vehicle.name)}</h3>
                  <div className="flex flex-wrap gap-1 text-[10px] mb-3">
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-600"><Users className="w-3 h-3" /> {t(vehicle.seats)}</span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-600"><Wind className="w-3 h-3 text-sky-500" /> {t(vehicle.ac)}</span>
                  </div>
                  
                  {(() => {
                    const parsed = parseDesc(vehicle.desc);
                    if (!parsed || !parsed.isStructured) {
                      return <p className="text-slate-500 text-xs leading-relaxed mb-4">{t(vehicle.desc)}</p>;
                    }
                    
                    return (
                      <div className="space-y-3 mb-4">
                        {/* Outstation Plan */}
                        {Object.keys(parsed.outstation).length > 0 && (
                          <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100/85 shadow-sm relative overflow-hidden">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 pointer-events-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block"></span>
                              {t('Outstation Plan')}
                            </h4>
                            <div className="space-y-1.5">
                              {Object.entries(parsed.outstation).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-medium">{t(key)}</span>
                                  <span className="font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200/40">{t(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Day Rental Plan */}
                        {Object.keys(parsed.dayRent).length > 0 && (
                          <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100/85 shadow-sm relative overflow-hidden">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 pointer-events-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                              {t('Day Rental Plan')}
                            </h4>
                            <div className="space-y-1.5">
                              {Object.entries(parsed.dayRent).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-medium">{t(key)}</span>
                                  <span className="font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200/40">{t(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-auto">
                  <div>
                    <span className="block text-[8px] text-slate-400 uppercase tracking-wider">{t('Starting from')}</span>
                    <span className="text-base font-extrabold text-slate-900">{vehicle.price}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                      title="Info"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleBookNow(vehicle.name)}
                      className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold active:bg-yellow-400 active:text-slate-900 transition-colors"
                    >
                      {t('Book Now')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedVehicle(null)}></div>
          <div className="relative bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl z-10 text-left">
            <button onClick={() => setSelectedVehicle(null)} className="absolute top-2 right-2 text-slate-400">✕</button>
            <div className="text-center mb-3">
              <img src={getVehicleImage(selectedVehicle.image)} alt={selectedVehicle.name} className="h-24 object-contain mx-auto mb-2" />
              <h3 className="text-lg font-bold">{t(selectedVehicle.name)}</h3>
              <span className="text-xs text-yellow-500 font-bold">{selectedVehicle.seats} | {selectedVehicle.ac}</span>
            </div>
            
            {(() => {
              const parsed = parseDesc(selectedVehicle.desc);
              if (!parsed || !parsed.isStructured) {
                return <p className="text-xs text-slate-600 mb-4 leading-relaxed">{t(selectedVehicle.desc)}</p>;
              }
              
              return (
                <div className="space-y-3 mb-4 max-h-[220px] overflow-y-auto pr-1">
                  {/* Outstation Plan */}
                  {Object.keys(parsed.outstation).length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-yellow-400"></span>
                        {t('Outstation Plan')}
                      </h4>
                      <div className="space-y-1">
                        {Object.entries(parsed.outstation).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-500">{t(key)}</span>
                            <span className="font-semibold text-slate-800">{t(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Day Rental Plan */}
                  {Object.keys(parsed.dayRent).length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500"></span>
                        {t('Day Rental Plan')}
                      </h4>
                      <div className="space-y-1">
                        {Object.entries(parsed.dayRent).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-500">{t(key)}</span>
                            <span className="font-semibold text-slate-800">{t(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
            
            <button
              onClick={() => {
                const name = selectedVehicle.name;
                setSelectedVehicle(null);
                handleBookNow(name);
              }}
              className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-yellow-450 active:bg-yellow-400 active:text-slate-900 text-xs"
            >
              Book {t(selectedVehicle.name)}
            </button>
          </div>
        </div>
      )}

      {!hideForm && (
        <InlineBookingForm defaultVehicle={bookingVehicle} />
      )}
    </section>
  );
}
