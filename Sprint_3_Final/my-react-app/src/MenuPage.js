import React from 'react';
import MenuList from './MenuList';

const MenuPage = ({ showBackgroundImage }) => {
  return (
    <div className={`menu-page ${showBackgroundImage ? 'background-image' : ''}`}>
      
      <MenuList />
    </div>
  );
};

export default MenuPage;