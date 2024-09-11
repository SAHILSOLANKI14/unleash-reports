import api from 'src/api';
import { objectToQueryString } from '../../../utils/helper';
export const fetchproductsearch = async (search) => {
  //   let qs = objectToQueryString(data);
  const url = `api/v1/products?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&name=${search}`;
  try {
    const response = await api(url, null, 'get');
    return response;
  } catch (error) {
    throw error;
  }
};
