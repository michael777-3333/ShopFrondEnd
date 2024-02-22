import axios from "./axios.js";
export const productsApi = (user)=> axios.get(`/products?populate=*`)