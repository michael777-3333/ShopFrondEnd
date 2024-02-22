import axios from "./axios.js";

export const loginRequest = (user)=> axios.post(`/auth/local`,user)
export const registerRequest = (user) => axios.post(`/auth/local/register`, user);

export const orderRequest = (products, token) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  
    return axios.post('/orders', { products }, { headers });
  };

