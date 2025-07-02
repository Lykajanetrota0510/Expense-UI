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
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
  const data = await getExpenseTypes(searchText);
  setExpenseTypes(data);
};


  useEffect(() => {
    fetchData();
  }, [searchText]);

  const handleSave = async (item) => {
    setIsLoading(true);
    if (item.id) {
      await updateExpenseType(item.id, item);
    } else {
      await createExpenseType(item);
    }
    setIsLoading(false);
    setShowModal(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      await deleteExpenseType(id);
      fetchData();
    }
  };

  return (
    <div className="container mt-5">
      <h2>Expense Type Management</h2>

      {/* ✅ Combined Search Bar */}
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Code or Description"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={() => setShowModal(true)}>
            + Create Expense Type
          </button>
        </div>
      </div>

      {/* List Table */}
      <ExpenseTypeList
        data={expenseTypes}
        onEdit={(item) => {
          setSelected(item);
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      {showModal && (
        <ExpenseTypeForm
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setSelected(null);
          }}
          onSave={handleSave}
          loading={isLoading}
          expenseType={selected}
        />
      )}
    </div>
  );
}

export default App;
