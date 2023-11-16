// Cashier.js
import React, { useState } from 'react';

const Cashier = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  const handleCheckout = () => {
    // Logic for processing the checkout
    alert(`Total Amount: $${totalAmount}`);
  };

  return (
    <div>
      <h2>Cashier Page</h2>
      <p>Total Amount: ${totalAmount}</p>
      <button onClick={() => setTotalAmount(totalAmount + 10)}>
        Add $10 to Total
      </button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cashier;
