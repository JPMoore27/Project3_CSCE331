import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

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
    const orderCounts = {};
    orderData.forEach(order => {
      const date = new Date(order.time).toLocaleDateString();
      orderCounts[date] = (orderCounts[date] || 0) + 1;
    });

    return {
      labels: Object.keys(orderCounts),
      datasets: [
        {
          label: 'Number of Orders',
          data: Object.values(orderCounts),
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.4)',
          hoverBorderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };

  return (
    <div>
      <h2>Order History Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Bar
            data={processOrderData()}
            options={{
              indexAxis: 'x', // Use 'x' for horizontal bar chart
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OrderHistoryChart;