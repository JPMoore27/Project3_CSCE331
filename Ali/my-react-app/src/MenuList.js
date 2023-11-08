// MenuList.js
import React from 'react';
import MenuItem from './MenuItem'; // Import the MenuItem component

// Sample data array corrected with consistent property names
const menuData = [
  { key: 0, itemName: 'Coffee', price: 2.99 },
  { key: 1, itemName: 'Cappuccino', price: 5.65 },
  { key: 3, itemName: 'Espresso', price: 3.65 },
  // ... the rest of your items
  { key: 47, itemName: 'Iced Cafe Caramel Latte', price: 5.65 },
];

const MenuList = () => {
  return (
    <div className="menu-list">
      {menuData.map((item) => (
        <MenuItem
          key={item.key} // Unique key for React list items
          name={item.itemName}
          price={`$${item.price.toFixed(2)}`} // Ensuring two decimal places
        />
      ))}
    </div>
  );
};

export default MenuList;
