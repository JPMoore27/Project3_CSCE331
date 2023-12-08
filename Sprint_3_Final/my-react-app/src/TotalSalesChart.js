import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const API_BASE_URL = 'https://project3-team03g.onrender.com/api';

const TotalSalesChart = () => {
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
    let totalSalesToDate = 0;

    orderData.forEach(order => {
      totalSalesToDate += parseFloat(order.price);
      const date = new Date(order.time).toLocaleDateString();
      salesData[date] = totalSalesToDate;
    });

    return {
      labels: Object.keys(salesData),
      datasets: [
        {
          label: 'Total Sales to Date',
          data: Object.values(salesData),
          fill: false,
          borderColor: '#fb3',
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div>
      <h2>Total Sales to Date Chart</h2>
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

export default TotalSalesChart;
