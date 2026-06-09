import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PhoneCall, Calendar, MapPin, Clock, Users, ShieldCheck, Car as CarIcon, CheckCircle2, MessageCircle, Star, Wallet, Navigation, Map, Info, ArrowRight, ChevronRight, ChevronLeft, X, Wind, Music } from 'lucide-react';
import { getVehicleImage, getBgImage, getPackageImage } from '../utils/imageImports';
import FloatingParticles from '../components/FloatingParticles';
import BookingModal from '../components/BookingModal';
import Logo from '../assets/madurai tour taxi logo.png';
import API_BASE_URL from '../apiConfig';

// Import newly generated high-resolution assets for separate screen fit
import MeenakshiDesktop from '../assets/meenakshi_desktop.png';
import MeenakshiMobile from '../assets/meenakshi_mobile.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';
import ThirumalaiMobile from '../assets/thirumalai_mobile.png';
import RameswaramDesktop from '../assets/rameswaram_desktop.png';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import OotyBg from '../assets/ooty_bg.png';
import KanyakumariBg from '../assets/kanyakumari_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import ThanjavurBg from '../assets/thanjavur_bg.png';
import MaduraiAerialBg from '../assets/madurai_aerial_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';


const defaultVehicles = [
  {
    name: 'Swift Dzire',
    seats: '4 Seater',
    ac: 'AC',
    price: '₹14/km',
    desc: '[Outstation Plan]\nRate: ₹14/km\nMin Distance: Above 250 km\nDriver Charge: ₹300/day\n\n[Day Rental Plan]\nBase Rent: ₹1600\nPer km Charge: ₹11/km\nDriver Charge: ₹300',
    image: 'sedan_cab-removebg-preview.png',
    bgImage: 'kanyakumari_bg.png'
  },
  {
    name: 'Maruti Ciaz Premium Sedan',
    seats: '4 Seater',
    ac: 'AC',
    price: '₹15/km',
    desc: '[Outstation Plan]\nRate: ₹15/km\nMin Distance: Above 250 km\nDriver Charge: ₹300/day\n\n[Day Rental Plan]\nBase Rent: ₹1700/day\nPer km Charge: ₹11/km',
    image: 'sedan_cab-removebg-preview.png',
    bgImage: 'munnar_bg.png'
  },
  {
    name: 'Prime SUV',
    seats: '7 Seater',
    ac: 'AC',
    price: '₹19/km',
    desc: '[Outstation Plan]\nRate: ₹19/km\nMin Distance: Above 300 km\nDriver Charge: ₹400/day\n\n[Day Rental Plan]\nBase Rent: ₹2300/day\nPer km Charge: ₹13/km\nDriver Charge: ₹400/day',
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

const defaultPackages = [
  { name: 'Madurai Local Tour', duration: '8 Hours / 80 KM', places: 'Meenakshi Temple, Thirumalai Nayakkar Mahal, Gandhi Museum', price: '₹2600', image: 'meenakshi_bg.png' },
  { name: 'Rameswaram Tour', duration: '12 Hours / 420 KM', places: 'Ramanathaswamy Temple, Dhanushkodi, Agniteertham, Pamban Bridge', price: '₹6000', image: 'rameswaram_bg.png' },
  { name: 'Kodaikanal Tour', duration: '12 Hours / 300 KM', places: 'Kodaikanal Lake, Coaker\'s Walk, Bryant Park, Pine Forest, Pillar Rocks', price: '₹5000', image: 'kodaikanal_bg.png' },
  { name: 'Ooty Tour', duration: '2 Days / 600 KM', places: 'Ooty Lake, Botanical Garden, Doddabetta Peak, Pykara Falls', price: '₹11000', image: 'ooty_bg.png' }
];

const reviewsData = [
  {
    name: 'Ramesh Kumar',
    text: 'We booked a round trip to Rameswaram from Madurai. The Swift Dzire was spotless, the AC was very cooling, and our driver Karthik was extremely familiar with the temple route and best local eateries. Highly recommended!',
    role: 'Local Customer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Dr. Priya Sharma',
    text: 'Our Kodaikanal trip with family in their Innova Crysta was outstanding. The driver handled the steep hill curves very smoothly, making the journey incredibly safe. Very reasonable prices with clear billing!',
    role: 'Tourist',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Arun Verma',
    text: 'Excellent airport pickup and temple sightseeing service in Madurai. The vehicle was on-time, and the driver spoke fluent Tamil and basic English. Super easy WhatsApp booking process.',
    role: 'Business Traveler',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Meera Nair',
    text: 'Booked a 12-seater Tempo Traveller for a family temple tour of Madurai, Thanjavur, and Trichy. Highly comfortable, clean upholstery, and excellent music system. The customer support team was responsive throughout.',
    role: 'Family Group',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Sanjay Krishnan',
    text: 'Best outstation taxi service in Madurai. Clean Ciaz sedan, safe night driving, and very professional behavior. No hidden charges - toll and parking bills were transparently shared. Recommend them to all tourists.',
    role: 'Regular Traveler',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Aishwarya Rajesh',
    text: 'Wonderful experience booking a taxi from Madurai to Munnar. The hill climb was extremely pleasant. The driver was polite, stopped at multiple scenic viewpoints for photos, and guided us well.',
    role: 'Leisure Traveler',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Rajesh Pillai',
    text: 'Punctual and reliable service. Used Madurai Tour Taxi for airport pickup at midnight. The driver was waiting with a placard and the sedan cab was clean. Fair prices and helpful support.',
    role: 'Corporate Client',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Kavitha Krishnan',
    text: 'Booked a trip to Kanyakumari to watch the sunset and return the next day. The drive was comfortable, and our driver suggested great local places to try authentic South Indian food. Will book again!',
    role: 'Family Trip',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&h=150&q=80'
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

const AnimatedCounter = ({ end, duration = 2, label, suffix = '+' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-xl md:text-2xl font-bold text-yellow-400 mb-0.5 font-poppins tracking-tight">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-slate-400 font-semibold text-[8px] md:text-[9px] uppercase tracking-widest leading-none">
        {label}
      </span>
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'AW-18225094695', {
        page_path: window.location.pathname,
      });
    }
  }, []);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], ["0%", "18%"]);

  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    vehicle: 'Select Vehicle',
    packageType: 'Custom Trip'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicles, setVehicles] = useState(defaultVehicles);
  const [packages, setPackages] = useState(defaultPackages);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setVehicles(data);
      })
      .catch(err => console.error('Failed to load fleet for Home:', err));

    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setPackages(data);
      })
      .catch(err => console.error('Failed to load packages for Home:', err));
  }, []);

  const carouselRef = useRef(null);
  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '', packageType: '' });
  const [showAllReviews, setShowAllReviews] = useState(false);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [bgIndex, setBgIndex] = useState(0);

  const desktopImages = [
    { src: CinematicSouthIndiaBg, pos: 'lg:object-center' },
    { src: MeenakshiDesktop, pos: 'lg:object-[center_22%]' },
    { src: ThirumalaiDesktop, pos: 'lg:object-[center_28%]' },
    { src: RameswaramDesktop, pos: 'lg:object-center' },
    { src: MaduraiAerialBg, pos: 'lg:object-[center_35%]' },
    { src: KodaikanalBg, pos: 'lg:object-center' },
    { src: OotyBg, pos: 'lg:object-center' },
    { src: KanyakumariBg, pos: 'lg:object-center' },
    { src: MunnarBg, pos: 'lg:object-center' },
    { src: ThanjavurBg, pos: 'lg:object-center' }
  ];

  const mobileImages = [
    { src: CinematicSouthIndiaBg, pos: 'object-center' },
    { src: MeenakshiMobile, pos: 'object-[center_top]' },
    { src: ThirumalaiMobile, pos: 'object-center' },
    { src: RameswaramBg, pos: 'object-center' },
    { src: MaduraiAerialBg, pos: 'object-center' },
    { src: KodaikanalBg, pos: 'object-center' },
    { src: OotyBg, pos: 'object-center' },
    { src: KanyakumariBg, pos: 'object-center' },
    { src: MunnarBg, pos: 'object-center' },
    { src: ThanjavurBg, pos: 'object-center' }
  ];

  const heroImages = isMobile ? mobileImages : desktopImages;

  const nextBg = () => {
    setBgIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevBg = () => {
    setBgIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const pickupInputRef = useRef(null);
  const dropInputRef = useRef(null);

  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);



  const detectLocation = async (type) => {
    const isPickup = type === 'pickup';
    const setLoading = isPickup ? setLoadingPickup : setLoadingDrop;

    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        if (window.google && window.google.maps && window.google.maps.Geocoder) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === "OK" && results[0]) {
              const address = results[0].formatted_address;
              setFormData(prev => ({
                ...prev,
                [isPickup ? 'fromLocation' : 'toLocation']: address
              }));
            } else {
              console.error("Google Geocoder status:", status);
              fallbackNominatim(latitude, longitude, isPickup);
            }
            setLoading(false);
          });
        } else {
          await fallbackNominatim(latitude, longitude, isPickup);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let msg = "Could not capture location automatically. Please type manually.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission was denied. Please type manually or enable location permissions in your browser.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Location information is unavailable. Please type manually.";
        } else if (error.code === error.TIMEOUT) {
          msg = "Location request timed out. Please try again or type manually.";
        }
        alert(msg);
        setLoading(false);
      },
      options
    );
  };

  const fallbackNominatim = async (latitude, longitude, isPickup) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error("Failed to reverse geocode coordinate");
      }
      const data = await response.json();
      if (data && data.display_name) {
        const address = data.display_name;
        setFormData(prev => ({
          ...prev,
          [isPickup ? 'fromLocation' : 'toLocation']: address
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [isPickup ? 'fromLocation' : 'toLocation']: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        }));
      }
    } catch (error) {
      console.error("Nominatim geocoding error:", error);
      setFormData(prev => ({
        ...prev,
        [isPickup ? 'fromLocation' : 'toLocation']: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
      }));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fromLocation || !formData.toLocation || !formData.name || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }

      alert("Booking saved successfully! Admin has been notified via WhatsApp.");

      setFormData({
        fromLocation: '',
        toLocation: '',
        date: '',
        time: '',
        name: '',
        phone: '',
        vehicle: 'Select Vehicle',
        packageType: 'Custom Trip'
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error processing your booking. Please try WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = (e) => {
    if (e) e.preventDefault();
    window.open('https://wa.me/918667520367?text=I%20want%20to%20book%20a%20taxi.', '_blank');
  };

  const openBookingModal = (type, value) => {
    if (type === 'vehicle') setModalData({ isOpen: true, vehicle: value, packageType: '' });
    else setModalData({ isOpen: true, vehicle: '', packageType: value });
  };

  return (
    <div className="relative font-roboto bg-slate-50 overflow-hidden">

      {/* Hero Section with full cover fit */}
      <section className="relative min-h-screen lg:h-screen flex items-center overflow-hidden bg-slate-950 h-auto py-20 lg:py-0">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={`${isMobile ? 'mobile' : 'desktop'}-${bgIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ y: yBg }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" }
              }}
              src={heroImages[bgIndex].src}
              className={`absolute -top-[10%] inset-x-0 w-full h-[120%] ${isMobile ? 'object-contain' : 'object-cover'} ${heroImages[bgIndex].pos || 'object-center'} filter saturate-[1.12] contrast-[1.03] brightness-[0.92] lg:brightness-[0.95]`}
              alt="Madurai Background"
            />
          </AnimatePresence>
          {/* Subtle cinematic golden solar sweep lighting */}
          <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-amber-500/10 via-transparent to-transparent z-[4] mix-blend-screen" />
          {/* Brighter balanced overlays to protect text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/30 to-transparent z-[5] lg:from-slate-950/55 lg:via-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-black/15 z-[5]" />
          <FloatingParticles />
        </div>

        {/* Manual Hero Background Slider Navigation Buttons */}
        <button
          onClick={prevBg}
          className="absolute left-1.5 md:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-11 md:h-11 rounded-full bg-slate-950/40 hover:bg-yellow-400 hover:text-slate-950 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 cursor-pointer backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button
          onClick={nextBg}
          className="absolute right-1.5 md:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-11 md:h-11 rounded-full bg-slate-950/40 hover:bg-yellow-400 hover:text-slate-950 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 cursor-pointer backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 items-center w-full">

            {/* Hero Content Column (Left on Desktop, Top on Mobile/Tablet) */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 pt-2 pb-4 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-yellow-400/50 text-yellow-400 font-extrabold mb-5 text-[10px] sm:text-xs lg:text-sm shadow-[0_4px_25px_rgba(250,204,21,0.25)] uppercase tracking-wider">
                ⭐ Premium Taxi Service in South India
              </div>

              {/* Logo & Heading Integration */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="shrink-0 p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={Logo}
                    alt="Madurai Tour Taxi Logo"
                    className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] group-hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-outfit font-black leading-[1.1] text-glow-premium tracking-tight">
                    <span className="text-yellow-400 drop-shadow-[0_3px_15px_rgba(250,204,21,0.45)]">{t('Madurai Tour Taxi').split(' ')[0]}</span>{' '}
                    <span className="text-white drop-shadow-[0_3px_15px_rgba(255,255,255,0.25)]">
                      {t('Madurai Tour Taxi').split(' ').slice(1).join(' ')}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-100 mt-2 font-bold tracking-wide text-glow-subtle font-poppins">
                    {t('Safe & Comfortable Taxi Service in Madurai')}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-slate-200 mb-6 max-w-xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {t('Local Tours, Outstation Trips, Airport Pickup & Temple Tours. Book your luxury ride today and travel with peace of mind.')}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3 mb-6 text-white w-full max-w-lg lg:max-w-none">
                {[
                  { icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />, label: '24/7 Service' },
                  { icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />, label: 'Safe Drivers' },
                  { icon: <CarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />, label: 'Clean Cars' },
                  { icon: <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />, label: 'GPS Tracking' },
                ].map((item, idx) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    key={idx}
                    className="flex items-center gap-2 bg-slate-950/45 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 hover:border-yellow-400/40 hover:bg-slate-950/60 transition-all shadow-lg cursor-default"
                  >
                    {item.icon}
                    <span className="text-xs sm:text-sm font-bold tracking-wide text-glow-subtle">{t(item.label)}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 w-full">
                <a
                  href="tel:8667520367"
                  className="shine-effect flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500 text-slate-950 rounded-full font-black hover:scale-105 transition-all shadow-[0_10px_30px_rgba(250,204,21,0.45)] border border-yellow-300/20 text-xs sm:text-sm md:text-base font-poppins"
                >
                  <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
                  +91 86675 20367
                </a>
                <button
                  onClick={openWhatsApp}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-black hover:scale-105 transition-all shadow-[0_10px_30px_rgba(34,197,94,0.45)] border border-green-400/20 animate-pulse-slow text-xs sm:text-sm md:text-base font-poppins"
                  style={{ animationDuration: '3s' }}
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Chat on WhatsApp
                </button>
              </div>

              {/* Thumbnails Carousel */}
              <div className="hidden sm:flex items-center gap-3 mt-4 w-full relative group">
                <button
                  onClick={(e) => { e.preventDefault(); scrollCarousel('left'); }}
                  className="absolute -left-4 z-10 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/20"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>

                <div ref={carouselRef} className="flex items-center gap-3 w-full overflow-x-hidden scroll-smooth py-2">
                  {[
                    { name: 'Madurai Tour', img: CinematicSouthIndiaBg },
                    { name: 'Meenakshi Temple', img: getPackageImage('meenakshi_bg.png') },
                    { name: 'Thirumalai Mahal', img: getPackageImage('thirumalai_mahal_bg.png') },
                    { name: 'City Aerial View', img: getPackageImage('madurai_aerial_bg.png') }
                  ].map((thumb, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="shine-effect relative w-32 h-20 lg:w-36 lg:h-22 rounded-2xl overflow-hidden shrink-0 border-2 border-white/15 hover:border-yellow-400 cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.3)] group/thumb"
                    >
                      <img
                        src={thumb.img}
                        alt={thumb.name}
                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-700 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-2">
                        <p className="text-white text-[10px] lg:text-xs font-bold leading-tight font-poppins text-glow-subtle">{t(thumb.name)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={(e) => { e.preventDefault(); scrollCarousel('right'); }}
                  className="absolute -right-4 z-10 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/20"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>

            {/* Booking Form Column (Right on Desktop, Bottom on Mobile/Tablet) */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-6 w-full max-w-lg mx-auto lg:max-w-none"
            >
              <div className="glassmorphic-premium rounded-3xl p-6 sm:p-7 lg:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 to-green-500"></div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-poppins font-black text-slate-900 mb-5 lg:mb-6 flex items-center gap-2.5">
                  <CarIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-yellow-500" /> {t('Book Your Ride')}
                </h3>

                <form className="space-y-3.5 lg:space-y-4" onSubmit={handleBookingSubmit}>

                  {/* Locations Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:gap-4">

                    {/* Pickup Input */}
                    <div className="relative animate-fadeIn">
                      <MapPin className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4 lg:w-4.5 lg:h-4.5" />
                      <input
                        ref={pickupInputRef}
                        type="text"
                        name="fromLocation"
                        value={formData.fromLocation}
                        onChange={handleInputChange}
                        placeholder={t('Start Location')}
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all text-slate-900 outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => detectLocation('pickup')}
                        className="absolute right-3.5 top-3.5 text-slate-455 hover:text-yellow-500 transition-colors focus:outline-none"
                        title={t("Detect Live Location")}
                      >
                        {loadingPickup ? (
                          <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Navigation className="w-4.5 h-4.5 hover:scale-110 active:scale-95 transition-transform" />
                        )}
                      </button>
                    </div>

                    {/* Drop Input */}
                    <div className="relative animate-fadeIn">
                      <MapPin className="absolute left-3.5 top-3.5 text-slate-455 w-4 h-4 lg:w-4.5 lg:h-4.5" />
                      <input
                        ref={dropInputRef}
                        type="text"
                        name="toLocation"
                        value={formData.toLocation}
                        onChange={handleInputChange}
                        placeholder={t('End Location')}
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all text-slate-900 outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => detectLocation('drop')}
                        className="absolute right-3.5 top-3.5 text-slate-450 hover:text-yellow-500 transition-colors focus:outline-none"
                        title={t("Detect Live Location")}
                      >
                        {loadingDrop ? (
                          <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Navigation className="w-4.5 h-4.5 hover:scale-110 active:scale-95 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-2 gap-3.5 lg:gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4 lg:w-4.5 lg:h-4.5" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.preventDefault()}
                        onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                        className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all outline-none ${!formData.date ? 'text-slate-400' : 'text-slate-900'}`}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4 lg:w-4.5 lg:h-4.5" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.preventDefault()}
                        onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                        className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all outline-none ${!formData.time ? 'text-slate-400' : 'text-slate-900'}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Customer Details Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:gap-4">
                    <div className="relative">
                      <Users className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4 lg:w-4.5 lg:h-4.5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('Customer Name')}
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all text-slate-900 outline-none"
                        required
                      />
                    </div>
                    <div className="relative">
                      <PhoneCall className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4 lg:w-4.5 lg:h-4.5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('Phone Number')}
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all text-slate-900 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Vehicle & Package Selection Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:gap-4">
                    <div className="relative">
                      <select
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all text-slate-700 outline-none appearance-none font-semibold cursor-pointer"
                      >
                        <option value="Select Vehicle">{t('Select Vehicle')}</option>
                        {vehicles.map(c => (
                          <option key={c.id || c.name} value={c.name}>{t(c.name)} ({t(c.seats || '4 Seater')})</option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <select
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm transition-all text-slate-700 outline-none appearance-none font-semibold cursor-pointer"
                      >
                        <option value="Custom Trip">{t('Custom Trip')}</option>
                        {packages.map(p => (
                          <option key={p.id || p.name} value={p.name}>{t(p.name)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="shine-effect w-full mt-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500 text-slate-900 font-bold py-3.5 lg:py-4 rounded-xl hover:scale-[1.01] transition-all shadow-[0_10px_30px_rgba(250,204,21,0.4)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group border border-yellow-300/20 text-sm lg:text-base cursor-pointer"
                  >
                    {isSubmitting ? 'PROCESSING...' : (
                      <>
                        {t('BOOK NOW')} <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-1 lg:mt-2 font-medium">Booking details will be stored securely & sent to WhatsApp</p>
                </form>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 border-y border-slate-800 py-2.5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <AnimatedCounter end={10000} label={t('Happy Customers')} suffix="+" />
            <AnimatedCounter end={5000} label={t('Trips Completed')} suffix="+" />
            <AnimatedCounter end={100} label={t('Customer Satisfaction')} suffix="%" />
            <AnimatedCounter end={24} label={t('Hours Support')} suffix="+" />
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-poppins font-bold text-slate-900 mb-4"
            >
              {t('Our Premium Vehicles')}
            </motion.h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">{t('Choose from our wide range of well-maintained vehicles for your journey.')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, idx) => {
              const parsed = parseDesc(vehicle.desc);
              return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgb(0,0,0,0.05)] overflow-hidden group card-3d-lift flex flex-col"
              >
                <div className="h-72 overflow-hidden relative flex items-center justify-center p-6 select-none bg-slate-950 shrink-0">
                  {/* Natural Scenic Background Image */}
                  <img
                    src={getBgImage(vehicle.bgImage)}
                    alt="Scenic Background"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.78] contrast-[1.05] z-0 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  {/* Visual gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10 z-[1] pointer-events-none" />

                  {/* Glassmorphic seats badge */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/10 z-20 shadow-lg">
                    {vehicle.seats}
                  </div>

                  {/* Showroom reflection sweep */}
                  <div className="reflection-overlay" />

                  {/* Turntable platform ring under the car */}
                  <div className="absolute bottom-5 w-[85%] h-6 rounded-full bg-slate-950/35 border border-white/10 blur-[1.5px] z-10 pointer-events-none" style={{ transform: "rotateX(75deg)" }} />

                  {/* Opaque 3D Turntable Rotating Vehicle Image */}
                  <div
                    className="relative z-20 w-full h-full flex items-center justify-center car-showroom-spin pointer-events-none"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img
                      src={getVehicleImage(vehicle.image)}
                      alt={vehicle.name}
                      className="w-[105%] h-auto object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] z-30 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-poppins font-bold text-slate-900 mb-3">{t(vehicle.name)}</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md font-medium"><Users className="w-4 h-4 text-slate-500" /> {t(vehicle.seats)}</span>
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md font-medium"><Wind className="w-4 h-4 text-sky-500 animate-pulse" /> {t(vehicle.ac)}</span>
                  </div>
                  
                  <div className="flex-grow">
                    {parsed && parsed.isStructured ? (
                      <div className="flex flex-col gap-3 mb-6">
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
                      <p className="text-slate-600 mb-6 text-sm">{t(vehicle.desc)}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{t('Starting from')}</p>
                      <p className="text-2xl font-bold text-slate-900">{vehicle.price}</p>
                    </div>
                    <button onClick={() => openBookingModal('vehicle', vehicle.name)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-yellow-400 hover:text-slate-900 transition-colors shadow-lg">
                      {t('Book Now')}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </motion.section>

      {/* Tour Packages */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-white"
            >
              {t('Popular Tour Packages')}
            </motion.h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">{t('Explore the beauty of South India with our specially curated tour packages.')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden hover:border-yellow-400/50 hover:shadow-[0_15px_30px_rgba(250,204,21,0.1)] transition-all duration-300 group flex flex-col h-full"
              >
                <div className="h-56 overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                  <img src={getPackageImage(pkg.image)} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-poppins font-bold text-white group-hover:text-yellow-400 transition-colors">{t(pkg.name)}</h3>
                    <p className="text-sm font-medium text-yellow-400">{t(pkg.duration)}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="flex items-start gap-2 mb-6">
                    <Map className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5 group-hover:rotate-6 transition-transform" />
                    <p className="text-sm text-slate-300 leading-relaxed">{t(pkg.places)}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-700/50 mt-auto">
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono tracking-wider mb-0.5">Fixed Price</span>
                      <span className="text-2xl font-black text-yellow-400">{pkg.price}</span>
                    </div>
                    <button
                      onClick={() => openBookingModal('package', pkg.name)}
                      className="w-11 h-11 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all cursor-pointer shadow-md"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-poppins font-bold text-slate-900 mb-4"
            >
              {t('Why Choose Us?')}
            </motion.h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
          </div>

          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad-clock" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>
                    <circle cx="32" cy="32" r="26" stroke="url(#grad-clock)" strokeWidth="4" fill="rgba(251, 191, 36, 0.05)" />
                    <circle cx="32" cy="32" r="2" fill="#fbbf24" />
                    <path d="M32 14V32H44" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M32 6V10M32 54V58M6 32H10M54 32H58" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                ),
                title: '24/7 Service',
                desc: 'Always available for your service, day or night.',
                color: 'hover:border-yellow-400/50 hover:shadow-yellow-400/10'
              },
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad-drivers" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                    <path d="M32 4L12 12V32C12 44 20 54 32 58C44 54 52 44 52 32V12L32 4Z" fill="rgba(52, 211, 153, 0.1)" stroke="url(#grad-drivers)" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M22 28L28 34L42 20" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Experienced Drivers',
                desc: 'Professional, polite, and verified drivers.',
                color: 'hover:border-green-400/50 hover:shadow-green-400/10'
              },
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad-cars" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    <path d="M46 14L43 20H21L18 14H46Z" fill="url(#grad-cars)" />
                    <path d="M10 28C10 24.7 12.7 22 16 22H48C51.3 22 54 24.7 54 28V38H10V28Z" fill="url(#grad-cars)" />
                    <circle cx="18" cy="38" r="6" fill="#1e3a8a" stroke="#fff" strokeWidth="2" />
                    <circle cx="46" cy="38" r="6" fill="#1e3a8a" stroke="#fff" strokeWidth="2" />
                    <path d="M48 6L51 10M54 4L56 8" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Clean & Safe Cars',
                desc: 'Well maintained and regularly sanitized vehicles.',
                color: 'hover:border-blue-400/50 hover:shadow-blue-400/10'
              },
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad-wallet" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>
                    </defs>
                    <rect x="8" y="14" width="48" height="36" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke="url(#grad-wallet)" strokeWidth="4" />
                    <circle cx="42" cy="32" r="6" fill="url(#grad-wallet)" />
                    <path d="M20 26H32M20 38H28" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Affordable Price',
                desc: 'Best price guarantee with no hidden charges.',
                color: 'hover:border-amber-500/50 hover:shadow-amber-500/10'
              },
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad-gps" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#0f766e" />
                      </linearGradient>
                    </defs>
                    <path d="M32 4C21 4 12 13 12 24C12 36 32 58 32 58C32 58 52 36 52 24C52 13 43 4 32 4Z" fill="rgba(45, 212, 191, 0.1)" stroke="url(#grad-gps)" strokeWidth="4" strokeLinejoin="round" />
                    <circle cx="32" cy="24" r="8" fill="url(#grad-gps)" />
                  </svg>
                ),
                title: 'GPS Enabled',
                desc: 'Track your ride in real-time for safety.',
                color: 'hover:border-teal-400/50 hover:shadow-teal-400/10'
              },
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad-booking" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#047857" />
                      </linearGradient>
                    </defs>
                    <rect x="8" y="10" width="48" height="44" rx="6" fill="rgba(52, 211, 153, 0.1)" stroke="url(#grad-booking)" strokeWidth="4" />
                    <path d="M22 6V14M42 6V14" stroke="url(#grad-booking)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M16 26H48M22 36L28 42L42 28" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Fast Booking',
                desc: 'Book your taxi instantly via WhatsApp.',
                color: 'hover:border-emerald-400/50 hover:shadow-emerald-400/10'
              },
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad-secure" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="100%" stopColor="#b91c1c" />
                      </linearGradient>
                    </defs>
                    <path d="M32 6L10 14V32C10 46 20 54 32 58C44 54 54 46 54 32V14L32 6Z" fill="rgba(248, 113, 113, 0.1)" stroke="url(#grad-secure)" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M20 30C20 23.4 25.4 18 32 18C38.6 18 44 23.4 44 30V34H20V30Z" fill="url(#grad-secure)" />
                    <rect x="18" y="34" width="28" height="14" rx="2" fill="url(#grad-secure)" />
                  </svg>
                ),
                title: 'Secure Travel',
                desc: 'Your safety is our highest priority.',
                color: 'hover:border-red-400/50 hover:shadow-red-400/10'
              },
              {
                icon: (
                  <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad-support" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#7e22ce" />
                      </linearGradient>
                    </defs>
                    <path d="M12 36C12 25 21 16 32 16C43 16 52 25 52 36V44H12V36Z" fill="rgba(192, 132, 252, 0.1)" stroke="url(#grad-support)" strokeWidth="4" />
                    <rect x="6" y="32" width="8" height="14" rx="3" fill="url(#grad-support)" />
                    <rect x="50" y="32" width="8" height="14" rx="3" fill="url(#grad-support)" />
                    <path d="M32 44V52M22 52H42" stroke="url(#grad-support)" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Customer Support',
                desc: 'Dedicated team to help you anytime.',
                color: 'hover:border-purple-400/50 hover:shadow-purple-400/10'
              }
            ].map((feature, idx) => (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                key={idx}
                className={`bg-slate-50/70 p-8 rounded-3xl text-center hover:bg-white hover:shadow-2xl transition-all duration-300 border border-slate-100 group cursor-default relative overflow-hidden ${feature.color}`}
              >
                {/* Background soft glowing accent circle */}
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors duration-500 z-0" />

                <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-slate-900 mb-6 shadow-sm border border-slate-100 group-hover:bg-slate-50 transition-all duration-300 relative z-10 feature-icon-3d">
                  <div className="group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold font-poppins text-slate-900 mb-3 relative z-10 group-hover:text-slate-800 transition-colors">{t(feature.title)}</h3>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10">{t(feature.desc)}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Another Section: 3 Row Layout booking process */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-poppins font-bold text-slate-900 mb-2">
                {t('Our Simple 3-Step Process')}
              </h3>
              <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {[
                { step: '01', title: 'Choose Your Car', desc: 'Select from our wide fleet of premium sedans, SUVs, and luxury tempo travellers.' },
                { step: '02', title: 'Enter Ride Details', desc: 'Input your pickup, drop location, date, time and customer name via our online booking form or WhatsApp.' },
                { step: '03', title: 'Start Your Ride', desc: 'Get booking confirmation immediately. Our verified driver will arrive on-time for a safe journey.' }
              ].map((proc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-yellow-400 hover:shadow-xl rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 group cursor-default"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-extrabold flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {proc.step}
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-lg font-black text-slate-900 mb-1">{t(proc.title)}</h4>
                    <p className="text-slate-500 text-sm">{t(proc.desc)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-slate-50 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-poppins font-bold text-slate-900 mb-4"
            >
              {t('What Our Customers Say')}
            </motion.h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full text-center"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsData.slice(0, 3).map((review, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-slate-100 relative hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="absolute top-8 right-8 text-yellow-100/50">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div>
                  <div className="text-yellow-400 mb-6 flex gap-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />)}
                  </div>
                  <p className="text-slate-650 mb-8 text-lg leading-relaxed relative z-10 font-medium italic">"{t(review.text)}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-yellow-400/30 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 font-poppins">{t(review.name)}</h4>
                    <p className="text-xs text-slate-500 font-medium">{t(review.role)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllReviews(true)}
              className="px-8 py-4 bg-slate-900 hover:bg-yellow-400 hover:text-slate-950 text-white rounded-xl font-bold transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer font-poppins uppercase tracking-wider"
            >
              Show More Reviews
            </button>
          </div>
        </div>
      </motion.section>

      {/* Floating Buttons handled globally by FloatingButtons component */}

      {/* Reviews Modal */}
      <AnimatePresence>
        {showAllReviews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllReviews(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl z-10 max-h-[85vh] flex flex-col overflow-hidden border border-slate-100 text-left"
            >
              <button
                onClick={() => setShowAllReviews(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 transition-colors w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center border border-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-8">
                <h3 className="text-2xl md:text-3xl font-poppins font-black text-slate-900 flex items-center gap-2">
                  <Star className="w-7 h-7 text-yellow-500 fill-current" /> Customer Satisfaction
                </h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">
                  Rated <span className="text-slate-900 font-bold">4.9/5</span> from 1500+ genuine reviews
                </p>
              </div>

              <div className="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5 pr-2 py-1">
                {reviewsData.map((review, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border border-yellow-400/30 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                            <p className="text-[10px] text-slate-500 font-medium">{review.role}</p>
                          </div>
                        </div>
                        <div className="text-yellow-400 flex gap-0.5 scale-90">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />)}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 italic leading-relaxed">"{review.text}"</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowAllReviews(false)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all cursor-pointer text-sm"
                >
                  Close Reviews
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultVehicle={modalData.vehicle}
        defaultPackage={modalData.packageType}
      />
    </div>
  );
};

export default Home;
