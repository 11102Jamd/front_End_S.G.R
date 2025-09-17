import React from 'react';

const CreateButton = ({ text = "Crear", onClick }) => {
  return (
    <button
      className='btn btn-success'
      onClick={onClick}
      title={text}
    >
      <i className="bi bi-plus-circle me-2"></i> {text}
    </button>
  );
};

export default CreateButton;
