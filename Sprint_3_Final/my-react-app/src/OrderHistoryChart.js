import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';

const API_BASE_URL = 'https://project3-team03g.onrender.com/api';

const OrderHistoryChart = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/`);
      setOrderData(response.data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processOrderData = () => {
    const salesData = {};
    orderData.forEach(order => {
      const date = new Date(order.time).toLocaleDateString();
      const totalSales = salesData[date] || 0;
      salesData[date] = totalSales + parseFloat(order.price);
    });
  
    // Sort dates
    const sortedDates = Object.keys(salesData).sort((a, b) => new Date(a) - new Date(b));
  
    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Total Sales',
          data: sortedDates.map(date => salesData[date]),
          fill: false,
          borderColor: '#fb3',
          borderWidth: 2,
        },
      ],
    };
  };  

  return (
    <div>
      <h2>Sales Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Line data={processOrderData()} />
        </div>
      )}
    </div>
  );
};

export default OrderHistoryChart;
