import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Wind, Music, Info, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../../apiConfig';
import BookingModal from '../BookingModal';
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
    name: 'Maruti Ertiga',
    seats: '7 Seater',
    ac: 'AC',
    price: '₹14/km',
    desc: '[Outstation Plan]\nRate: ₹14/km\nMin Distance: Above 250 km\nDriver Charge: ₹300/day\n\n[Day Rental Plan]\nBase Rent: ₹1600/day\nPer km Charge: ₹11/km',
    image: 'suv-removebg-preview.png',
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

export default function TabletVehicles() {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState(defaultVehicles);
  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '' });
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setVehicles(data);
      })
      .catch(err => console.error('Failed to load fleet for tablet:', err));
  }, []);

  const openBookingModal = (vehicle) => {
    setModalData({ isOpen: true, vehicle });
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-poppins font-bold text-slate-900 mb-2">
            {t('Our Premium Vehicles')}
          </h2>
          <div className="w-16 h-1 bg-yellow-450 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="mt-3 text-slate-500 text-sm max-w-md mx-auto">{t('Choose from our wide range of well-maintained vehicles for your journey.')}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 items-stretch">
          {vehicles.map((vehicle, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="h-44 overflow-hidden relative flex items-center justify-center p-4 bg-slate-950">
                <div className="absolute inset-0 bg-slate-800 z-0" />
                <img
                  src={getVehicleImage(vehicle.image)}
                  alt={vehicle.name}
                  className="h-32 w-auto object-contain z-10 filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 z-20">
                  {vehicle.seats}
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t(vehicle.name)}</h3>
                  <div className="flex flex-wrap gap-1.5 text-xs mb-3">
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-655"><Users className="w-3 h-3" /> {t(vehicle.seats)}</span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-655"><Wind className="w-3 h-3 text-sky-500" /> {t(vehicle.ac)}</span>
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
                          <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-100/85 shadow-sm relative overflow-hidden">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 pointer-events-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block"></span>
                              {t('Outstation Plan')}
                            </h4>
                            <div className="space-y-1.5">
                              {Object.entries(parsed.outstation).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-medium">{t(key)}</span>
                                  <span className="font-semibold text-slate-800 bg-white px-2.5 py-0.5 rounded border border-slate-200/40">{t(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Day Rental Plan */}
                        {Object.keys(parsed.dayRent).length > 0 && (
                          <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-100/85 shadow-sm relative overflow-hidden">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 pointer-events-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                              {t('Day Rental Plan')}
                            </h4>
                            <div className="space-y-1.5">
                              {Object.entries(parsed.dayRent).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-medium">{t(key)}</span>
                                  <span className="font-semibold text-slate-800 bg-white px-2.5 py-0.5 rounded border border-slate-200/40">{t(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase tracking-wider">{t('Starting from')}</span>
                    <span className="text-lg font-bold text-slate-900">{vehicle.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                      title="View Info"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openBookingModal(vehicle.name)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-yellow-450 hover:bg-yellow-400 hover:text-slate-900 transition-colors"
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

      {/* Vehicle Info Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedVehicle(null)}></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10 text-left">
            <button onClick={() => setSelectedVehicle(null)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-900">✕</button>
            <div className="text-center mb-4">
              <img src={getVehicleImage(selectedVehicle.image)} alt={selectedVehicle.name} className="h-28 object-contain mx-auto mb-2" />
              <h3 className="text-xl font-bold">{t(selectedVehicle.name)}</h3>
              <span className="text-xs text-yellow-500 font-bold">{selectedVehicle.seats} | {selectedVehicle.ac}</span>
            </div>
            
            {(() => {
              const parsed = parseDesc(selectedVehicle.desc);
              if (!parsed || !parsed.isStructured) {
                return <p className="text-sm text-slate-600 mb-5 leading-relaxed">{t(selectedVehicle.desc)}</p>;
              }
              
              return (
                <div className="space-y-3.5 mb-5 max-h-[260px] overflow-y-auto pr-1">
                  {/* Outstation Plan */}
                  {Object.keys(parsed.outstation).length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                        {t('Outstation Plan')}
                      </h4>
                      <div className="space-y-1.5">
                        {Object.entries(parsed.outstation).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">{t(key)}</span>
                            <span className="font-semibold text-slate-800">{t(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Day Rental Plan */}
                  {Object.keys(parsed.dayRent).length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {t('Day Rental Plan')}
                      </h4>
                      <div className="space-y-1.5">
                        {Object.entries(parsed.dayRent).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-xs">
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
                openBookingModal(name);
              }}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-colors text-sm"
            >
              Book {t(selectedVehicle.name)}
            </button>
          </div>
        </div>
      )}

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultVehicle={modalData.vehicle}
      />
    </section>
  );
}
