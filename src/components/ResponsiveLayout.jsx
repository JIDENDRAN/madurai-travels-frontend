// src/components/ResponsiveLayout.jsx
import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import DesktopWrapper from './DesktopWrapper';
import TabletWrapper from './TabletWrapper';
import MobileWrapper from './MobileWrapper';

/**
 * Wrapper that selects the appropriate layout based on viewport width.
 * Guarantees that each breakpoint renders its own isolated component tree,
 * preventing any CSS or component bleed between Desktop, Tablet, and Mobile.
 */
export default function ResponsiveLayout() {
  const breakpoint = useMediaQuery();

  if (breakpoint === 'desktop') return <DesktopWrapper />;
  if (breakpoint === 'tablet') return <TabletWrapper />;
  if (breakpoint === 'mobile') return <MobileWrapper />;
  // Fallback to desktop if no match
  return <DesktopWrapper />;
}
