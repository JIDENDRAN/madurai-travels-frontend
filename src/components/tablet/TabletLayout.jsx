import React from 'react';
import TabletNavbar from './TabletNavbar';
import TabletFooter from './TabletFooter';
import { Routes, Route } from 'react-router-dom';
import TabletHome from '../../pages/tablet/TabletHome';
import TabletAbout from '../../pages/tablet/TabletAbout';
import TabletVehicles from '../../pages/tablet/TabletVehicles';
import TabletPackages from '../../pages/tablet/TabletPackages';
import TabletContact from '../../pages/tablet/TabletContact';
import TabletGallery from '../../pages/tablet/TabletGallery';

const TabletLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-roboto">
      <TabletNavbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<TabletHome />} />
          <Route path="/about" element={<TabletAbout />} />
          <Route path="/vehicles" element={<TabletVehicles />} />
          <Route path="/packages" element={<TabletPackages />} />
          <Route path="/contact" element={<TabletContact />} />
          <Route path="/gallery" element={<TabletGallery />} />
        </Routes>
      </main>
      <TabletFooter />
    </div>
  );
};

export default TabletLayout;
