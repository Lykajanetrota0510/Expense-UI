// src/components/ExpenseTypeForm.js
import React, { useState, useEffect } from 'react';

const ExpenseTypeForm = ({ onSubmit, selected, setSelected }) => {
  const [formData, setFormData] = useState({ id: 0, code: '', description: '' });

  useEffect(() => {
    if (selected) {
      setFormData({
        id: selected.id || 0,
        code: selected.code || '',
        description: selected.description || '',
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ id: 0, code: '', description: '' });
    setSelected(null); // Clear selection after submit
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Code"
          className="form-control"
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {formData.id !== 0 ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default ExpenseTypeForm;
