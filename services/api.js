import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-fiscaliza-8b2f4.cloudfunctions.net/api/',
  // baseURL: 'http://172.20.10.10:3333'
});

export default api;
