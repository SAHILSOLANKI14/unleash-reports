import axios from 'axios';
// import api from 'src/api';
// import { objectToQueryString } from '../../../utils/helper';
// const API_KEY = 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos';
// const BASE_URL = '/api/v1';

// const authApi = {
//   loginUser: (data) => {
//     const queryString = new URLSearchParams(data).toString();
//     return axios.get api(`${BASE_URL}/login?api-key=${API_KEY}&${queryString}`);
//   },
// };

// export default authApi;

import api from 'src/api';

export const loginUser = (data) => {

//   let qs = objectToQueryString(data);
//   console.log('qs');
//   console.log(qs);

//   return api(`/api/v1/login?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&${qs}`, null, 'GET');
};
