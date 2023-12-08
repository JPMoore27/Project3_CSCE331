import React from 'react';
import CashierList from './CashierList';
import AddOnSection from './AddOnSection';
import AddonsPopup from './AddonsPopup';

const CashierPage = ({ showBackgroundImage }) => {
  return (
    <div className={`menu-page ${showBackgroundImage ? 'background-image' : ''}`}>
      <AddOnSection />
      <CashierList />
    </div>
  );
};

export default CashierPage;