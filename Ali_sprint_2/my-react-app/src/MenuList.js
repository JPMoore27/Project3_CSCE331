import React, { useState } from 'react';
import MenuItem from './MenuItem';
import ShoppingCartPopup from './ShoppingCartPopup';
import { addToCart, calculateTotal } from './Cart'; // Import other necessary dependencies
import './MenuItem.css';
import coffeeCup from './assets/coffeeCup.png';
import togoCoffeeCup from './assets/togoCoffeeCup.png'; // Import togoCoffeeCup

const menuData = [
  { itemName: "Coffee", price: 2.99 },
  { itemName: "Cappuccino", price: 5.65 },
  // ... (other menu items)
  { itemName: "Iced Cafe Caramel Latte", price: 5.65 }
];
const MenuList = () => {
  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const getRandomImage = () => togoCoffeeCup;

  const handleShowCartPopup = () => {
    setShowCartPopup(true);
  };

  const handleCloseCartPopup = () => {
    setShowCartPopup(false);
  };

  return (
    <div>
      <div className="grid-container">
        {menuData.map((item, index) => (
          <MenuItem
            key={item.itemName}
            name={item.itemName}
            price={item.price} // Make sure price is correctly set here
            image={getRandomImage()}
            index={index}
            addToCart={() => {
              const newItem = { ...item, quantity: 1 };
              setCart([...cart, newItem]);
              handleShowCartPopup();
            }}
          />
        ))}
      </div>

      <button onClick={handleShowCartPopup}>View Cart</button>

      {showCartPopup && (
        <ShoppingCartPopup
          cart={cart}
          onClose={handleCloseCartPopup}
        />
      )}
    </div>
  );
};

export default MenuList;