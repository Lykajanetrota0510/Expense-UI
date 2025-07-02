// src/api.js
import axios from 'axios';

const BASE_URL = 'https://localhost:7222/api/expenses/types/v1';

export const getExpenseTypes = async (search = '') => {
  const res = await axios.get(`${BASE_URL}/GetAll`, {
    params: { code: search }  // only code param now
  });
  return res.data;
};


export const createExpenseType = async (expenseType) => {
  const res = await axios.post(`${BASE_URL}/Create`, expenseType);
  return res.data;
};

export const updateExpenseType = async (id, data) => {
  return await axios.put(`${BASE_URL}/Update/${id}`, data);
};

export const deleteExpenseType = async (id) => {
  const res = await axios.delete(`${BASE_URL}/Delete/${id}`);
  return res.data;
};
