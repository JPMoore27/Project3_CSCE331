// src/components/StockTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockTable = () => {
  const [stock, setStock] = useState([]);
  const [setAmountValue, setSetAmountValue] = useState(""); // State to store the value for the "Set" action

  useEffect(() => {
    // Fetch stock data from your Django backend API and sort by stockid
    axios.get('https://project3-team03g.onrender.com/api/stock/')
      .then(response => {
        const sortedStock = response.data.sort((a, b) => a.stockid - b.stockid);
        setStock(sortedStock);
      })
      .catch(error => console.error('Error fetching stock:', error));
  }, []);

  const handleIncrementClick = (stockId, use) => {
    // Make a PATCH request to increment the amount by the use value
    axios.patch(`https://project3-team03g.onrender.com/api/stock/${stockId}/`, {
      amount: use,
    })
      .then(response => {
        // Update the local state with the new stock data
        setStock(prevStock => prevStock.map(item => (item.stockid === stockId ? response.data : item)));
      })
      .catch(error => console.error('Error incrementing stock:', error));
  };

  const handleDecrementClick = (stockId, use) => {
    // Make a PATCH request to decrement the amount by the use value
    axios.patch(`https://project3-team03g.onrender.com/api/stock/${stockId}/`, {
      amount: -use,
    })
      .then(response => {
        // Update the local state with the new stock data
        setStock(prevStock => prevStock.map(item => (item.stockid === stockId ? response.data : item)));
      })
      .catch(error => console.error('Error decrementing stock:', error));
  };

  const handleSetClick = (stockId) => {
    // Make a PATCH request to set the amount to the specified value
    axios.patch(`https://project3-team03g.onrender.com/api/stock/${stockId}/`, {
      amount: setAmountValue,
    })
      .then(response => {
        // Update the local state with the new stock data
        setStock(prevStock => prevStock.map(item => (item.stockid === stockId ? response.data : item)));
      })
      .catch(error => console.error('Error setting stock amount:', error));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Stock Name</th>
          <th>Amount</th>
          <th>Unit</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {stock.map(item => (
          <tr key={item.stockid}>
            <td>{item.stockname}</td>
            <td>{item.amount}</td>
            <td>{item.unit}</td>
            <td>
              <button onClick={() => handleIncrementClick(item.stockid, item.use)}>Add 1</button>
              <button onClick={() => handleDecrementClick(item.stockid, item.use)}>Subtract 1</button>
            </td>
            <td>
              <input
                type="text"
                value={setAmountValue}
                onChange={(e) => setSetAmountValue(e.target.value)}
                placeholder="Choose Amount"
              />
              <button onClick={() => handleSetClick(item.stockid)}>Enter</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
