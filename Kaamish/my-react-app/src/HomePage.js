import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <img
        src={process.env.PUBLIC_URL + '/assets/back_ground_pic/x.png'} // Correct path
        alt="Background"
      />
    </div>
  );
};

export default HomePage;
