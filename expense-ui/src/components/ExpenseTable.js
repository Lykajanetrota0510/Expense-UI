import React from 'react';

const ExpenseTypeTable = ({ data, onEdit, onDelete }) => {
  if (!data.length) return <p>No records found.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
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
                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit({ id, code, description })}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTypeTable;
