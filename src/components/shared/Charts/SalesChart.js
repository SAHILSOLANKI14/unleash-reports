import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Container, Typography, CircularProgress } from '@mui/material';

const SalesLineChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  const fetchSalesData = async () => {
    try {
      const response = await axios.get('https://dev.unleashpos.com/api/v2/sales/getLastMonthSales');
      setSalesData(response.data.data);
      console.log('Salesdata', salesData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchSalesData();
  // }, []);
  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sales Data for Last Month
      </Typography>
      <LineChart
        width={600}
        height={300}
        data={salesData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884D8" activeDot={{ r: 8 }} />
      </LineChart>
    </Container>
  );
};
export default SalesLineChart;
