import axios from 'axios'
import { getToken } from '../utils/helpers';

export const baseURL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_HOST_URL
    : import.meta.env.VITE_APP_HOST_URL_LIVE

const instance = axios.create({ baseURL })

instance.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response.data.message ? error.response.data.message : null;
    if (status === "Unauthenticated.") {
      // localStorage.clear('user');
      window.location.href = '/'
    }
    return Promise.reject(error);
  });
export default instance