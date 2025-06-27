import React from 'react';

const ExpenseTypeList = ({ data, onEdit, onDelete }) => {
  if (!data.length) return <p>No data found.</p>;

  return (
    <table border="1">
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
            <td>
              <button onClick={() => onEdit({ id, code, description })}>Edit</button>
              <button onClick={() => onDelete(id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTypeList;
