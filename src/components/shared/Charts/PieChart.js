import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export function Piechart() {
  const [chartData, setChartData] = useState([['Date', 'Total']]);
  useEffect(() => {
    axios
      .get('https://dev.unleashpos.com/api.php?action=last_sevenday_sales_dashboard')
      .then((response) => {
        const apiData = response.data.data;
        // console.log('API data:', apiData);
        const formatDate = (datestr) => {
          const date = new Date(datestr);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const dayname = date.toLocaleDateString('en-us', { weekday: 'short' });
          return `${day}/${month} (${dayname})`;
        };
        const dataFormat = [['Date', 'Total']];

        apiData.forEach((item) => {
          const total = parseFloat(item.total);
          const FormateDate = formatDate(item.date);
          dataFormat.push([FormateDate, isNaN(total) ? 0 : total]);
        });
        setChartData(dataFormat);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <Chart
      chartType="PieChart"
      // options={options}
      width={'100%'}
      height={'250px'}
      data={chartData}
    />
  );
}
