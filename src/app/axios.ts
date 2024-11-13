import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sitelabfortest.biz/apiv2',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
