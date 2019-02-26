import axios from 'axios';
import * as humps from 'humps';

const apiUrl = process.env.REACT_APP_ENV === "production" ?
                  "https://widgetly-app.herokuapp.com/"
                :
                  "http://localhost:3001/"




export const getApi = () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.authorization = `Bearer ${token? token : "" }`;
   const axiosApi = axios.create({
    baseURL: apiUrl,
    transformResponse: [
      ...axios.defaults.transformResponse,
      data => humps.camelizeKeys(data)
    ],
    transformRequest: [
      data => humps.decamelizeKeys(data),
      ...axios.defaults.transformRequest
    ]
  });
  return axiosApi;
}
