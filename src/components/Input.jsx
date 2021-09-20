import React from 'react';
import PropTypes from 'prop-types';

function Input({ type, onChange, testid, value }) {
  return (
    <div>
      <input
        type={ type }
        value={ value }
        data-testid={ testid }
        onChange={ onChange }
        id={ testid }
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
