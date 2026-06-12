import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneCall, MessageCircle, MapPin, Calendar, Clock, Users, Car, ArrowRight, CheckCircle, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/MaduraiTaxiLogo.png';
import MeenakshiMobile from '../../assets/meenakshi_mobile.png';
import ThirumalaiMobile from '../../assets/thirumalai_mobile.png';
import RameswaramBg from '../../assets/rameswaram_bg.png';
import API_BASE_URL from '../../apiConfig';

export default function MobileHero() {
  const { t } = useTranslation();
  const [bgIndex, setBgIndex] = useState(0);

  const images = [MeenakshiMobile, ThirumalaiMobile, RameswaramBg];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  // ---- Booking form state ----
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    fromLocation: '', toLocation: '', date: '', time: '',
    name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`).then(r => r.json()).then(setCars).catch(() => {});
    fetch(`${API_BASE_URL}/api/packages`).then(r => r.json()).then(setPackages).catch(() => {});
  }, []);

  useEffect(() => {
    const handleItemSelect = (e) => {
      const { vehicle, package: pkg } = e.detail;
      setFormData(prev => ({
        ...prev,
        ...(vehicle ? { vehicle } : {}),
        ...(pkg ? { packageType: pkg } : {}),
      }));
    };
    window.addEventListener('select-booking-item', handleItemSelect);
    return () => window.removeEventListener('select-booking-item', handleItemSelect);
  }, []);



  const detectLocation = (type) => {
    const isPickup = type === 'pickup';
    const setLoading = isPickup ? setLoadingPickup : setLoadingDrop;
    setLoading(true);
    if (!navigator.geolocation) { alert('Geolocation not supported.'); setLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        if (window.google?.maps?.Geocoder) {
          new window.google.maps.Geocoder().geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              if (status === 'OK' && results[0]) {
                setFormData(prev => ({ ...prev, [isPickup ? 'fromLocation' : 'toLocation']: results[0].formatted_address }));
              }
              setLoading(false);
            }
          );
        } else {
          try {
            setFormData(prev => ({ ...prev, [isPickup ? 'fromLocation' : 'toLocation']: `${latitude}, ${longitude}` }));
          } catch { /* ignore */ }
          setLoading(false);
        }
      },
      () => { alert('Could not get location.'); setLoading(false); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fromLocation || !formData.toLocation || !formData.name || !formData.phone) {
      alert(t('Please fill in all required fields.')); return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setIsSuccess(true);
      const text = `*New Booking Request*\n\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer:*\nName: ${formData.name}\nPhone: ${formData.phone}`;
      setTimeout(() => {
        window.open(`https://wa.me/918667520367?text=${encodeURIComponent(text)}`, '_blank');
        setIsSuccess(false);
        setFormData({ fromLocation: '', toLocation: '', date: '', time: '', name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip' });
      }, 3000);
    } catch {
      alert(t('Error. Please try WhatsApp directly.'));
    } finally { setIsSubmitting(false); }
  };

  const inputCls = 'w-full pl-9 pr-9 py-2.5 rounded-lg bg-white/95 backdrop-blur-sm border border-white/30 text-slate-800 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all';
  const selectCls = 'w-full px-3 py-2.5 rounded-lg bg-white/95 backdrop-blur-sm border border-white/30 text-slate-700 text-xs font-medium appearance-none focus:ring-2 focus:ring-yellow-400 outline-none transition-all';

  return (
    <section className="relative flex flex-col bg-slate-950 text-white overflow-hidden" id="booking-section">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={bgIndex}
            src={images[bgIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover object-center"
            alt="South India Destination"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
      </div>

      {/* Brand Header - Old Design */}
      <div className="relative z-10 flex flex-col items-center text-center pt-8 pb-3 px-4">
        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4 overflow-hidden border border-white/20">
          <img src={Logo} alt="Madurai Tour Taxi" className="w-20 h-20 object-contain" />
        </div>
        <h1 className="text-[42px] font-poppins font-black leading-none tracking-tight uppercase">
          <span className="text-yellow-400 drop-shadow-md">MADURAI</span>
          <br />
          <span className="text-white drop-shadow-md mt-1 block">{t('Tour Taxi')}</span>
        </h1>
        <p className="text-sm font-extrabold tracking-[0.12em] text-yellow-400 uppercase mt-3">
          {t('Premium Travel Experience')}
        </p>
        
        {/* Description line below header */}
        <p className="text-sm text-slate-200 max-w-[320px] font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-5 mb-3">
          {t('Safe & Comfortable Taxi Service in Madurai. Explore local tours, outstation packages, and temple tours.')}
        </p>
      </div>

      {/* Inline Booking Form */}
      <div className="relative z-10 px-4 pb-6 pt-2 max-w-[380px] mx-auto w-full">
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Form header strip */}
          <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />
          
          <div className="p-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Car className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">{t('Book Your Ride')}</span>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{t('Booking Confirmed!')}</h3>
                <p className="text-slate-400 text-xs mb-4">{t('Redirecting to WhatsApp...')}</p>
                <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3 }} className="h-full bg-green-500" />
                </div>
              </motion.div>
            ) : (
              <form className="space-y-2.5" onSubmit={handleSubmit}>
                {/* Pickup */}
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 text-yellow-400 w-4 h-4" />
                  <input ref={pickupRef} type="text" name="fromLocation" value={formData.fromLocation}
                    onChange={handleChange} placeholder={t('Pickup Location')} className={inputCls} required />
                  <button type="button" onClick={() => detectLocation('pickup')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-yellow-400">
                    {loadingPickup ? <div className="w-3.5 h-3.5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                      : <Navigation className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Drop */}
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 text-yellow-400 w-4 h-4" />
                  <input ref={dropRef} type="text" name="toLocation" value={formData.toLocation}
                    onChange={handleChange} placeholder={t('Drop Location')} className={inputCls} required />
                  <button type="button" onClick={() => detectLocation('drop')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-yellow-400">
                    {loadingDrop ? <div className="w-3.5 h-3.5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                      : <Navigation className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 text-yellow-400 w-4 h-4" />
                    <input 
                      type="date"
                      name="date" 
                      value={formData.date} 
                      onChange={handleChange}
                      onKeyDown={(e) => e.preventDefault()}
                      onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                      className={`${inputCls} pr-2 ${!formData.date ? 'text-slate-400' : 'text-slate-800'}`} 
                      required 
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 text-yellow-400 w-4 h-4" />
                    <input 
                      type="time"
                      name="time" 
                      value={formData.time} 
                      onChange={handleChange}
                      onKeyDown={(e) => e.preventDefault()}
                      onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                      className={`${inputCls} pr-2 ${!formData.time ? 'text-slate-400' : 'text-slate-800'}`} 
                      required 
                    />
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Users className="absolute left-2.5 top-2.5 text-yellow-400 w-4 h-4" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder={t('Your Name')} className={`${inputCls} pr-2`} required />
                  </div>
                  <div className="relative">
                    <PhoneCall className="absolute left-2.5 top-2.5 text-yellow-400 w-4 h-4" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder={t('Phone Number')} className={`${inputCls} pr-2`} required />
                  </div>
                </div>

                {/* Vehicle & Package */}
                <div className="grid grid-cols-2 gap-2">
                  <select name="vehicle" value={formData.vehicle} onChange={handleChange} className={selectCls}>
                    <option>{t('Select Vehicle')}</option>
                    {cars.map(c => <option key={c.id} value={c.name}>{t(c.name)}</option>)}
                  </select>
                  <select name="packageType" value={formData.packageType} onChange={handleChange} className={selectCls}>
                    <option>{t('Custom Trip')}</option>
                    {packages.map(p => <option key={p.id} value={p.name}>{t(p.name)}</option>)}
                  </select>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-extrabold py-3 rounded-xl shadow-lg active:scale-[0.97] transition-all flex justify-center items-center gap-2 disabled:opacity-70 text-sm"
                >
                  {isSubmitting ? t('PROCESSING...') : (
                    <>{t('CONFIRM BOOKING')} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Call & WhatsApp buttons below form */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <a href="tel:8667520367"
            className="flex items-center justify-center gap-1.5 bg-slate-900/80 backdrop-blur-sm text-white border border-white/20 py-2.5 px-4 rounded-full text-xs font-bold">
            <PhoneCall className="w-3.5 h-3.5 text-yellow-400" />
            <span>{t('Call Now')}</span>
          </a>
          <a href="https://wa.me/918667520367" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-green-600/90 backdrop-blur-sm text-white border border-green-500/20 py-2.5 px-4 rounded-full text-xs font-bold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
