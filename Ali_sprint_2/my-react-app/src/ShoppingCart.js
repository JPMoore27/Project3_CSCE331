// ShoppingCart.js
import React, { useState } from 'react';
import { addToCart, removeFromCart, adjustQuantity, calculateTotal } from './Cart'; // Updated import statement

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const exampleItem = { id: 1, name: 'Coffee', price: 2.99, quantity: 1 };

  return (
    <div>
      <button onClick={() => addToCart(cart, exampleItem, setCart)}>Add Coffee to Cart</button>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            <button onClick={() => removeFromCart(cart, item.id, setCart)}>Remove</button>
            <button onClick={() => adjustQuantity(cart, item.id, item.quantity + 1, setCart)}>+</button>
            <button onClick={() => adjustQuantity(cart, item.id, item.quantity - 1, setCart)}>-</button>
          </li>
        ))}
      </ul>
      <p>Total Cost: ${calculateTotal(cart).toFixed(2)}</p>
    </div>
  );
};

export default ShoppingCart;
