import React, { useState, useEffect } from 'react';
import './MenuItem.css';
import togoCoffeeCup from './assets/togoCoffeeCup.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import AddonsPopup from './AddonsPopup';
import ShoppingCartPopup from './ShoppingCartPopup';
import { calculateTotal } from './Cart';
import CashierItem from './CashierItem';

const CashierList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [animatingItems, setAnimatingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddonsPopup, setShowAddonsPopup] = useState(false);
  const [itemPrice, setItemPrice] = useState(0); // State to store item price

  useEffect(() => {
    fetch('https://project3-team03g.onrender.com/api/items/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const uniqueItems = data.reduce((unique, item) => {
          const isDuplicate = unique.some(uItem => uItem.itemName === item.itemname);
          if (!isDuplicate) {
            unique.push({ itemName: item.itemname, price: parseFloat(item.price) });
          }
          return unique;
        }, []);
        setMenuItems(uniqueItems);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getRandomImage = () => togoCoffeeCup;

  const handleShowCartPopup = () => {
    setShowCartPopup(true);
  };

  const handleCloseCartPopup = () => {
    setShowCartPopup(false);
  };

  const togglePopup = () => {
    setShowAddonsPopup(!showAddonsPopup);
  };

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.itemName === item.itemName);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
    setAnimatingItems([...animatingItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item.itemName !== itemToRemove.itemName);
    setCart(updatedCart);
    const updatedAnimatingItems = animatingItems.filter((item) => item.itemName !== itemToRemove.itemName);
    setAnimatingItems(updatedAnimatingItems);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          <div className="grid-container">
            {menuItems.map((item, index) => (
              <CashierItem
                key={index}
                name={item.itemName}
                price={item.price}
                image={getRandomImage()}
                addToCart={() => addToCart(item)}
                togglePopup={togglePopup}
                animatingItems={animatingItems}
                // Set the item price when clicking on a menu item
                setItemPrice={() => setItemPrice(item.price)}
              />
            ))}
          </div>
          <div className="cart-icon" onClick={handleShowCartPopup}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {animatingItems.length > 0 && (
              <div className="animated-items">{animatingItems.length}</div>
            )}
          </div>
          {showCartPopup && (
            <ShoppingCartPopup
              cart={cart}
              onClose={handleCloseCartPopup}
              onRemoveItem={removeFromCart}
              calculateTotal={calculateTotal}
            />
          )}
          {showAddonsPopup && (
            <AddonsPopup
              showPopup={showAddonsPopup}
              togglePopup={togglePopup}
              addToCart={addToCart}
              itemPrice={itemPrice}
              cart={cart}
              setCart={setCart}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CashierList;
