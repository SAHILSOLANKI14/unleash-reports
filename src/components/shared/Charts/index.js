import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export const options = {
  chart: {
    title: 'Company Performance',
    subtitle: 'Sales, Expenses, and Profit: 2021-2024',
  },
};

export function DashboardCharts() {
  const [chartData, setChartData] = useState([['Date', 'Total']]);
  useEffect(() => {
    axios
      .get('https://dev.unleashpos.com/api.php?action=last_sevenday_sales_dashboard')
      .then((response) => {
        const apiData = response.data.data;

        const formatDate = (Datestr) => {
          const date = new Date(Datestr);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

          // Format as "DD/MM" or "Day Name"
          return `${day}/${month} (${dayName})`;
        };

        const formattedData = [['Date', 'Total']];

        apiData.forEach((item) => {
          const total = parseFloat(item.total);
          const formattedDate = formatDate(item.date);
          formattedData.push([formattedDate, isNaN(total) ? 0 : total]);
        });
        setChartData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return <Chart chartType="Bar" width="100%" height="400px" data={chartData} options={options} />;
}
