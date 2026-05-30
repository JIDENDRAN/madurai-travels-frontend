import React from 'react';
import TabletLayout from './tablet/TabletLayout';

/**
 * TabletWrapper ensures that the Tablet UI (768px–1024px) is isolated.
 * No desktop Tailwind utilities are applied here.
 */
const TabletWrapper = (props) => {
  return <TabletLayout {...props} />;
};

export default TabletWrapper;
