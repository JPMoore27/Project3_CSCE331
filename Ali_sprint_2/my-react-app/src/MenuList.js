import React, { useState } from 'react';
import MenuItem from './MenuItem';
import ShoppingCartPopup from './ShoppingCartPopup';
import AddonsPopup from './AddonsPopup'; // Import the AddonsPopup component
import { calculateTotal } from './Cart'; // Import other necessary dependencies
import './MenuItem.css';
import coffeeCup from './assets/coffeeCup.png';
import togoCoffeeCup from './assets/togoCoffeeCup.png'; // Import togoCoffeeCup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const menuData = [
  { itemName: "Coffee", price: 2.99 },
  { itemName: "Cappuccino", price: 5.65 },
  { itemName: "Espresso", price: 3.65 },
  // ... (other menu items)
];

const MenuList = () => {
  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showAddonsPopup, setShowAddonsPopup] = useState(false); // State for AddonsPopup
  const [selectedAddons, setSelectedAddons] = useState([]); // State to store selected addons

  const getRandomImage = () => togoCoffeeCup;

  const handleShowCartPopup = () => {
    setShowCartPopup(true);
  };

  const handleCloseCartPopup = () => {
    setShowCartPopup(false);
  };

  const handleShowAddonsPopup = () => {
    setShowAddonsPopup(true); // Show AddonsPopup when called
  };

  const handleCloseAddonsPopup = () => {
    setShowAddonsPopup(false); // Hide AddonsPopup when called
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
  };

  const removeFromCart = (itemToRemove) => {
    // Implement the removal logic here
    const updatedCart = cart.filter((item) => item.itemName !== itemToRemove.itemName);
    setCart(updatedCart);
  };

  const addAddonsToCart = (selectedAddons) => {
    // Add selected addons to the main cart
    setCart([...cart, ...selectedAddons]);
    setSelectedAddons([]); // Clear selected addons
    setShowAddonsPopup(false); // Close the AddonsPopup
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
            addToCart={() => {
              addToCart(item);
              handleShowAddonsPopup(); // Show AddonsPopup when "Add to cart" is clicked
            }}
          />
        ))}
      </div>

      <div className="cart-icon" onClick={handleShowCartPopup}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {/* ... (rest of the code for the cart icon) */}
      </div>

      {/* Render the cart popup component when showCartPopup is true */}
      {showCartPopup && (
        <ShoppingCartPopup
          cart={cart}
          onClose={handleCloseCartPopup}
          onRemoveItem={removeFromCart}
        />
      )}

      {/* Render the addons popup when showAddonsPopup is true */}
      {showAddonsPopup && (
        <AddonsPopup
          addonsCart={cart} // Pass the cart as addonsCart
          onClose={handleCloseAddonsPopup}
          onAddToCart={addAddonsToCart} // Pass the addAddonsToCart function
          selectedAddons={selectedAddons} // Pass selected addons to the AddonsPopup
        />
      )}
    </div>
  );
};

export default MenuList;
