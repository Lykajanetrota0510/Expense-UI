// src/components/ExpenseTypeForm.js
import React, { useState, useEffect } from 'react';

const ExpenseTypeForm = ({ onSubmit, selected, setSelected }) => {
  const [formData, setFormData] = useState({ id: 0, code: '', description: '' });

  useEffect(() => {
    if (selected) {
      setFormData(selected);
    } else {
      setFormData({ id: 0, code: '', description: '' });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ id: 0, code: '', description: '' });
    setSelected(null);
  };

  const handleCancel = () => {
    setFormData({ id: 0, code: '', description: '' });
    setSelected(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>{formData.id ? 'Update' : 'Create'} Expense Type</h5>
      <div className="mb-3">
        <label className="form-label">Code</label>
        <input
          type="text"
          className="form-control"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">
        {formData.id ? 'Update' : 'Create'}
      </button>
      {formData.id !== 0 && (
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ExpenseTypeForm;
