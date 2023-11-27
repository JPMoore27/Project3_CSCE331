import React from 'react';

const SalesPage = () => {
  // Dummy total sales amount
  const totalSalesAmount = 2134;

  return (
    <div>
      <h2>Sales Page</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
        <h3>Total Sales</h3>
        <p>${totalSalesAmount}</p>
      </div>
    </div>
  );
};

export default SalesPage;
