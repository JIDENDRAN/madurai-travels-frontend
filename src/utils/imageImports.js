/* src/utils/imageImports.js */
// Centralized image imports for the Madurai Tour Taxi project
// This file provides mapping objects to resolve image names to imported modules.
// It enables static imports while allowing dynamic lookup based on image filename.

// Vehicle images
import InnovaImg from '../assets/innova_crysta-removebg-preview.png';
import SedanImg from '../assets/sedan_cab-removebg-preview.png';
import SuvImg from '../assets/suv-removebg-preview.png';
import EtiosImg from '../assets/toyota_etios-removebg-preview.png';
import TravellerImg from '../assets/trmpo_traveller-removebg-preview.png';

export const vehicleImageMap = {
  'innova_crysta-removebg-preview.png': InnovaImg,
  'sedan_cab-removebg-preview.png': SedanImg,
  'suv-removebg-preview.png': SuvImg,
  'toyota_etios-removebg-preview.png': EtiosImg,
  'tempo_traveller-removebg-preview.png': TravellerImg
};

// Background images for vehicles and packages
import MeenakshiBg from '../assets/meenakshi_bg.png';
import MaduraiAerialBg from '../assets/madurai_aerial_bg.png';
import ThirumalaiBg from '../assets/thirumalai_mahal_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import OotyBg from '../assets/ooty_bg.png';
import KanyakumariBg from '../assets/kanyakumari_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import ThanjavurBg from '../assets/thanjavur_bg.png';

export const bgImageMap = {
  'meenakshi_bg.png': MeenakshiBg,
  'madurai_aerial_bg.png': MaduraiAerialBg,
  'thirumalai_mahal_bg.png': ThirumalaiBg,
  'rameswaram_bg.png': RameswaramBg,
  'kodaikanal_bg.png': KodaikanalBg,
  'ooty_bg.png': OotyBg,
  'kanyakumari_bg.png': KanyakumariBg,
  'munnar_bg.png': MunnarBg,
  'thanjavur_bg.png': ThanjavurBg
};

// Package images (reuse some background images)
export const packageImageMap = {
  'hero.png': '../assets/hero.png', // direct path for lazy loading if needed
  'madurai_aerial_bg.png': MaduraiAerialBg,
  'meenakshi_bg.png': MeenakshiBg,
  'thirumalai_mahal_bg.png': ThirumalaiBg,
  'rameswaram_bg.png': RameswaramBg,
  'kodaikanal_bg.png': KodaikanalBg,
  'ooty_bg.png': OotyBg,
  'kanyakumari_bg.png': KanyakumariBg,
  'munnar_bg.png': MunnarBg,
  'thanjavur_bg.png': ThanjavurBg
};

// Helper functions
export const getVehicleImage = (name) => vehicleImageMap[name] || SedanImg;
export const getBgImage = (name) => bgImageMap[name] || KanyakumariBg;
export const getPackageImage = (name) => packageImageMap[name] || MeenakshiBg;
