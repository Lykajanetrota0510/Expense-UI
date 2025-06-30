// src/App.js
import React, { useEffect, useState } from 'react';
import {
  getExpenseTypes,
  createExpenseType,
  updateExpenseType,
  deleteExpenseType
} from './api';
import ExpenseTypeForm from './components/ExpenseTypeform';
import ExpenseTypeList from './components/ExpenseTypeList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const res = await getExpenseTypes();
      setExpenseTypes(res.data);
    } catch (err) {
      setError('Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (data.id && data.id !== 0) {
        await updateExpenseType(data);
      } else {
        await createExpenseType(data);
      }
      fetchData();
    } catch (err) {
      setError('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteExpenseType(id);
      fetchData();
    } catch (err) {
      setError('Error deleting data');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Expense Type</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ExpenseTypeForm onSubmit={handleSubmit} selected={selected} setSelected={setSelected} />
      <ExpenseTypeList data={expenseTypes} onEdit={setSelected} onDelete={handleDelete} />
    </div>
  );
}

export default App;
