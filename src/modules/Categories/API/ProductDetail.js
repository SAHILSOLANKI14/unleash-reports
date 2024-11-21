import api from 'src/api';

export const fetchproductDetailData = async (id) => {
  const url = `api/v1/products?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&code=${id}`;
  // console.log('searchTerm', status);
  try {
    const response = await api(url, null, 'get');
    return response;
  } catch (error) {
    throw error;
  }
};
