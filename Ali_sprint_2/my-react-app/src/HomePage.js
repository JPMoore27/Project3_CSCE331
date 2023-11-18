import React from 'react';
import back_ground_pic from './assets/back_ground_pic/x.png';
import './home_page.css';

const HomePage = () => {
  const getRandomImage = () => back_ground_pic;
  return (
    <div>
      <img src={getRandomImage()} alt="coffee" className="image_on_main_page"/>
    </div>
  );
};

export default HomePage;
