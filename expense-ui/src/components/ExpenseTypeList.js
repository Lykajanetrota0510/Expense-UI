// src/components/ExpenseTypeList.js
import React from 'react';

function ExpenseTypeList({ data, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Code</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.code}</td>
            <td>{item.description}</td>
            <td>
              <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(item)}>
                Edit
              </button>
<button className="btn btn-danger btn-sm" onClick={() => onDelete(item)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        {data.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center">No data found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ExpenseTypeList;
