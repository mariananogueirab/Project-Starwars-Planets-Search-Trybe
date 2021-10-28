import React from 'react';
import PropTypes from 'prop-types';

function Input({ type, onChange, testid, value, label, name }) {
  return (
    <div className="container">
      <label htmlFor={ testid }>
        {label}
        <input
          type={ type }
          value={ value }
          data-testid={ testid }
          onChange={ onChange }
          id={ testid }
          name={ name }
        />
      </label>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
