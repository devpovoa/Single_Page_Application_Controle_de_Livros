import axios from 'axios';

export const inAxios = axios.create({
 baseURL: process.env.REACT_APP_API_URL,
});