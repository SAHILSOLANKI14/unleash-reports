import axios from 'axios';
import api from 'src/api';
export const submitFormData = async (data) => {
  const url = `api/v1/sales?`;

  try {
    const response = await api(url, data, 'post', {
      'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
      'Content-Type': 'application/json',
    });
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
