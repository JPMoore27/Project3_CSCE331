// MenuList.js
import React from 'react';
import MenuItem from './MenuItem';
import './MenuItem.css'; // This should be the CSS for the MenuList, not MenuItem
import coffeeCup from './assets/coffeeCup.png';
import togoCoffeeCup from './assets/togoCoffeeCup.png';



// You would now include images in your data or handle it directly in the component
const menuData = [
    { itemName: "Coffee", price: 2.99 },
    { itemName: "Cappuccino", price: 5.65 },
    { itemName: "Espresso", price: 3.65 },
    { itemName: "Latte", price: 5.65 },
    { itemName: "Americano", price: 4.65 },
    { itemName: "Breve", price: 4.65 },
    { itemName: "EyeOpener", price: 3.65 },
    { itemName: "Cortado", price: 4.65 },
    { itemName: "Eugene's Latte", price: 5.65 },
    { itemName: "Nutty Irishman", price: 5.65 },
    { itemName: "Waffle", price: 5.65 },
    { itemName: "Iced Coffee", price: 2.99 },
    { itemName: "Iced Espresso", price: 3.65 },
    { itemName: "Iced Latte", price: 5.65 },
    { itemName: "Iced Americano", price: 4.65 },
    { itemName: "Iced Eye Opener", price: 3.65 },
    { itemName: "Iced Eugene's Latte", price: 5.65 },
    { itemName: "Iced Nutty Irishman", price: 5.65 },
    { itemName: "Iced Waffle Latte", price: 5.65 },
    { itemName: "Cafe Caramel Latte", price: 5.65 },
    { itemName: "Iced Cafe Caramel Latte", price: 5.65 }
  ];
  
  

  const MenuList = () => {
    const getRandomImage = () => togoCoffeeCup;
  
    return (
      <div className="grid-container">
        {menuData.map((item, index) => (
          <MenuItem
            key={item.itemName}
            name={item.itemName}
            price={`$${item.price.toFixed(2)}`}
            image={getRandomImage()}
            index={index} // Pass the index to each item
          />
        ))}
      </div>
    );
  };
  
  
  export default MenuList;