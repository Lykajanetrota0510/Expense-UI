import React, { useState, useEffect } from 'react';

const ExpenseTypeform = ({ onSubmit, selected, setSelected }) => {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selected) {
      setCode(selected.code);
      setDescription(selected.description);
    }
  }, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !description) return alert('Both fields required');
    onSubmit({ id: selected?.id || 0, code, description });
    setCode('');
    setDescription('');
    setSelected(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{selected ? 'Update' : 'Add'} Expense Type</button>
    </form>
  );
};

export default ExpenseTypeform;
