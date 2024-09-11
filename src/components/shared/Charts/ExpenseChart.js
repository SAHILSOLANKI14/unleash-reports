import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export function ExpenseChart() {
  const [chartData, setChartData] = useState([['Date', 'Total']]);

  useEffect(() => {
    axios
      .get('https://dev.unleashpos.com/api.php?action=last_sevenday_sales')
      .then((response) => {
        const apiData = response.data.data;
        console.log('API data:', apiData);

        const formatteDate = (datestr) => {
          const date = new Date(datestr);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const DayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          return `${day}/${month} (${DayName})`;
        };

        const formattedData = [['Date', 'Total']];

        apiData.forEach((item) => {
          const total = parseFloat(item.total);
          const formatDate = formatteDate(item.date);
          formattedData.push([formatDate, isNaN(total) ? 0 : total]);
        });
        setChartData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Chart
      chartType="BarChart"
      width="80%"
      height="400px"
      data={chartData}
      chartPackages={['corechart', 'controls']}
      controls={[
        {
          controlType: 'StringFilter',
          options: {
            filterColumnIndex: 0,
            matchType: 'any',
            ui: {
              label: 'Search by date',
            },
          },
        },
      ]}
    />
  );
}
