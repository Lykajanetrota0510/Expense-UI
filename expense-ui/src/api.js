import axios from 'axios';

const API_URL = 'https://localhost:7222/api/expenses/types/v1';

export const getExpenseTypes = () => axios.get(`${API_URL}/GetAll`);
export const createExpenseType = (data) => axios.post(`${API_URL}/Create`, data);
export const updateExpenseType = (data) =>axios.put(`https://localhost:7222/api/expenses/types/v1/Update/${data.id}`, data);
export const deleteExpenseType = (id) => axios.delete(`${API_URL}/Delete/${id}`);
