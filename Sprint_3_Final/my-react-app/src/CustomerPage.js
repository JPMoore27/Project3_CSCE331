import React from 'react';
import CustomerList from './CustomerList';
import AddOnSection from './AddOnSection';

const CustomerPage = ({ showBackgroundImage }) => {
  return (
    <div className={`menu-page ${showBackgroundImage ? 'background-image' : ''}`}>
      <AddOnSection />
      <CustomerList />
    </div>
  );
};

export default CustomerPage;