// src/components/mobile/MobileLayout.jsx
import React from 'react';
import MobileNavbar from './MobileNavbar';
import MobileFooter from './MobileFooter';
import MobileHome from './MobileHome';
import MobileAbout from './MobileAbout';
import MobileVehicles from './MobileVehicles';
import MobilePackages from './MobilePackages';
import MobileContact from './MobileContact';
import MobileGallery from './MobileGallery';
import InlineBookingForm from '../InlineBookingForm';
import { Routes, Route } from 'react-router-dom';

export default function MobileLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-roboto">
      <MobileNavbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MobileHome />} />
          <Route path="/about" element={<MobileAbout />} />
          <Route path="/vehicles" element={<MobileVehicles />} />
          <Route path="/packages" element={<MobilePackages />} />
          <Route path="/contact" element={<MobileContact />} />
          <Route path="/gallery" element={<MobileGallery />} />
          <Route path="/booking" element={<InlineBookingForm />} />
        </Routes>
      </main>
      <MobileFooter />
    </div>
  );
}
