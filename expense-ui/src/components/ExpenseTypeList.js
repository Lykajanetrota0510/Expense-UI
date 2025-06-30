import React from 'react';
import './ExpenseTypeList.css'; // import the CSS file

const ExpenseTypeList = ({ data, onEdit, onDelete }) => {
  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Code</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, code, description }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{code}</td>
            <td>{description}</td>
            <td className="action-buttons">
              <button className="edit-btn" onClick={() => onEdit({ id, code, description })}>
  Edit
</button>
<button className="delete-btn" onClick={() => onDelete(id)}>
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
