// src/components/ExpenseTypeList.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExpenseTypeList.css';

const ExpenseTypeList = ({ data, onEdit, onDelete }) => {
  return (
    // Added expense-table class
    <table className="table table-striped expense-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, code, description }) => (
          <tr key={id}>
            <td>{code}</td>
            <td>{description}</td>
            <td>
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => onEdit({ id, code, description })}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTypeList;
