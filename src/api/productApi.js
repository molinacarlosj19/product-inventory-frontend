import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllProducts = () => axios.get(BASE_URL);
export const getProductById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createProduct = (product) => axios.post(BASE_URL, product);
export const updateProduct = (id, product) => axios.put(`${BASE_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${BASE_URL}/${id}`);
