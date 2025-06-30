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

  const handleCodeChange = (e) => {
    setFormData(prev => ({ ...prev, code: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setFormData(prev => ({ ...prev, description: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ id: 0, code: '', description: '' });
    setSelected(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleCodeChange}
            placeholder="Enter code"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4">
          {formData.id !== 0 ? (
            <>
              <button type="submit" className="btn btn-success me-2">Update</button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">Create</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ExpenseTypeForm;
