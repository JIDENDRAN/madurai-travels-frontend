import React from 'react';
import MobileLayout from './mobile/MobileLayout';

/**
 * MobileWrapper ensures the Mobile UI (max-width: 767px) stays completely isolated.
 * No desktop or tablet Tailwind utilities are applied here.
 */
const MobileWrapper = (props) => {
  return <MobileLayout {...props} />;
};

export default MobileWrapper;
