import React, { useState, useEffect } from 'react';

const MenuList = () => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make an HTTP GET request to your API endpoint
    const apiUrl = "http://127.0.0.1:8000/api/items/";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setMenuData(jsonData);
        setIsLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setIsLoading(false); // Set loading to false on error
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Menu Data</h1>
          <pre>{JSON.stringify(menuData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MenuList;
