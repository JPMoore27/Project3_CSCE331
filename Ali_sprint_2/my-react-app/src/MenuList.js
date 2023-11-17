import React, { useState } from 'react';
import MenuItem from './MenuItem';
import ShoppingCartPopup from './ShoppingCartPopup';
import { calculateTotal } from './Cart'; // Import other necessary dependencies
import './MenuItem.css';
import coffeeCup from './assets/coffeeCup.png';
import togoCoffeeCup from './assets/togoCoffeeCup.png'; // Import togoCoffeeCup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const menuData = [
  { itemName: "Coffee", price: 2.99 },
  { itemName: "Cappuccino", price: 5.65 },
  // ... (other menu items)
];

const MenuList = () => {
  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false); // State to control the cart popup
  const [animatingItems, setAnimatingItems] = useState([]); // State to track animating items

  const getRandomImage = () => togoCoffeeCup;

  const handleShowCartPopup = () => {
    setShowCartPopup(true);
  };

  const handleCloseCartPopup = () => {
    setShowCartPopup(false);
  };

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.itemName === item.itemName);

    if (existingItemIndex !== -1) {
      // If the item exists in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with quantity 1
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }

    // Add the item to the animatingItems array
    setAnimatingItems([...animatingItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item.itemName !== itemToRemove.itemName);
    setCart(updatedCart);

    // Update the animatingItems array to remove the item
    const updatedAnimatingItems = animatingItems.filter((item) => item.itemName !== itemToRemove.itemName);
    setAnimatingItems(updatedAnimatingItems);
  };

  return (
    <div>
      <div className="grid-container">
        {menuData.map((item, index) => (
          <MenuItem
            key={index}
            name={item.itemName}
            price={item.price}
            image={getRandomImage()}
            index={index}
            addToCart={() => addToCart(item)}
            animatingItems={animatingItems}
          />
        ))}
      </div>

      <div className="cart-icon" onClick={handleShowCartPopup}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {animatingItems.length > 0 && <div className="animated-items">{animatingItems.length}</div>}
      </div>

      {/* Render the cart popup component when showCartPopup is true */}
      {showCartPopup && (
        <ShoppingCartPopup
          cart={cart}
          onClose={handleCloseCartPopup}
          onRemoveItem={removeFromCart}
        />
      )}
    </div>
  );
};

export default MenuList;
