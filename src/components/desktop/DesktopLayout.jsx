// src/components/desktop/DesktopLayout.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Vehicles from '../../pages/Vehicles';
import Packages from '../../pages/Packages';
import Contact from '../../pages/Contact';
import Gallery from '../../pages/Gallery';

/**
 * Desktop layout – retains the original premium UI.
 * All components rendered here are the existing desktop versions, ensuring no changes affect other breakpoints.
 */
export default function DesktopLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
