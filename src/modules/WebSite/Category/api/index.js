import api from 'src/api';
import { objectToQueryString } from 'src/utils/helper';
// import { objectToQueryString } from '../../../utils/helper';
export const fetchCategoriesData = async (data) => {
  //   let qs = objectToQueryString(data);
  const url = `api/v1/categories?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&limit=50`;
  try {
    const response = await api(url, null, 'get');
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchproductCategoryData = async (categoryId) => {
  if (!categoryId || typeof categoryId !== 'object') {
    throw new Error('Input must be a non-null object');
  }
  const queryString = objectToQueryString(categoryId);
  const response = await fetch(`/api/products?${queryString}`);
  return response.json();
};
