import React, { useEffect, useState } from 'react';
import {
  getExpenseTypes,
  addExpenseType,
  updateExpenseType,
  deleteExpenseType,
} from './api';
import ExpenseTypeForm from './components/ExpenseTypeform';
import ExpenseTypeList from './components/ExpenseTypeList';

function App() {
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getExpenseTypes();
      setExpenseTypes(res.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
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
        await addExpenseType(data);
      }
      fetchData();
    } catch (err) {
      setError('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteExpenseType(id);
      fetchData();
    } catch (err) {
      setError('Error deleting data');
    }
  };

  return (
    <div>
      <h1>Expense Type Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ExpenseTypeForm onSubmit={handleSubmit} selected={selected} setSelected={setSelected} />
      <ExpenseTypeList
        data={expenseTypes}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
