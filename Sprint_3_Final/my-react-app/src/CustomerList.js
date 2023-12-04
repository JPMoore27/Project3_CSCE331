import React, { useState, useEffect } from 'react';
import CustomerItem from './CustomerItem';
import ShoppingCartPopup from './ShoppingCartPopup';
import { calculateTotal } from './Cart';
import './MenuItem.css';
import togoCoffeeCup from './assets/togoCoffeeCup.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CustomerList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [animatingItems, setAnimatingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          <div className="grid-container">
            {menuItems.map((item, index) => (
              <CustomerItem
                key={index}
                name={item.itemName}
                price={item.price}
                image={getRandomImage()}
                animatingItems={animatingItems}
              />
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default CustomerList;
