import React from 'react';
import MenuList from './MenuList';
import AddOnSection from './AddOnSection';

const MenuPage = ({ showBackgroundImage }) => {
  return (
    <div className={`menu-page ${showBackgroundImage ? 'background-image' : ''}`}>
      <AddOnSection />
      <MenuList />
    </div>
  );
};

export default MenuPage;