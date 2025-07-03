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
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState(null);
const [deleting, setDeleting] = useState(false);

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

 const confirmDelete = (id) => {
  setDeleteId(id);
  setShowDeleteModal(true);
};

const handleDelete = async () => {
  setDeleting(true);
  try {
    await deleteExpenseType(deleteId);
    await fetchData();
  } catch (err) {
    console.error('Delete failed:', err);
  } finally {
    setDeleting(false);
    setShowDeleteModal(false);
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
          <button className="btn btn-primary w-35" onClick={() => setShowModal(true)}>
            Create 
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
  onDelete={(item) => {
    setDeleteId(item.id);
    setShowDeleteModal(true);
  }}
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
      {showDeleteModal && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Delete</h5>
          <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? <span className="spinner-border spinner-border-sm" /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default App;
