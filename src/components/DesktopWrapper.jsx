import React from 'react';
import DesktopLayout from './desktop/DesktopLayout';

/**
 * DesktopWrapper isolates the desktop UI.
 * It is rendered only when the viewport matches the desktop breakpoint.
 * No Tailwind utility classes are added here to avoid affecting other breakpoints.
 */
export default function DesktopWrapper() {
  return <DesktopLayout />;
}
