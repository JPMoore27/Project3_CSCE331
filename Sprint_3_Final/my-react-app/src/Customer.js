// Customer.js
import React, { useState } from 'react';

const Customer = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Logic for adding the selected product and quantity to the cart
    alert(`Added ${quantity} ${selectedProduct}(s) to cart`);
  };

  return (
    <div>
      <h2>Customer Page</h2>
      <label>
        Select Product:
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="item1">Item 1</option>
          <option value="item2">Item 2</option>
          <option value="item3">Item 3</option>
        </select>
      </label>
      <br />
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </label>
      <br />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Customer;
