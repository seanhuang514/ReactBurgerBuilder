import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.defaults.headers.common['Authorization'] = 'Auth token by instance';

export default axiosInstance