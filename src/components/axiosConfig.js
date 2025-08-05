import axios from 'axios';
import { URL_SERVER } from '../contexts/constantesVar';
import AppContext from '../contexts/ServiceContext';
import { useContext } from 'react';
const token = JSON.parse(window.localStorage.getItem('dataUser'))
  ? JSON.parse(window.localStorage.getItem('dataUser')).token
  : '';
const axiosConfigs = axios.create({
  baseURL: URL_SERVER,
  headers: {
    'x-access-token': token,
  },
});

export default axiosConfigs;
