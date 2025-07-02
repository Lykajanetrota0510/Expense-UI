// src/components/ExpenseTypeForm.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';

function ExpenseTypeForm({ show, onClose, onSave, loading, expenseType }) {
  const [formData, setFormData] = useState({ code: '', description: '' });

  useEffect(() => {
    if (expenseType) {
      setFormData({
        id: expenseType.id,
        code: expenseType.code,
        description: expenseType.description,
      });
    }
  }, [expenseType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{expenseType ? 'Edit' : 'Create'} Expense Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExpenseTypeForm;
