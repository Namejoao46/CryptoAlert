import axios from 'axios';

const api = axios.create({
  // Troque pelo IP que você viu no ipconfig
  baseURL: 'http://192.168.1.10:4000', 
});

export default api;