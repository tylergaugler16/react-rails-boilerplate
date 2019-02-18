import axios from 'axios';
import * as humps from 'humps';

const apiUrl = process.env.REACT_APP_ENV === "production" ?
                  "https://widgetly-app.herokuapp.com/"
                :
                  "http://localhost:3001/"

const token = localStorage.getItem('token');
axios.defaults.headers.common.authorization = `Bearer ${token? token : "" }`;
export const api = axios.create({
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
