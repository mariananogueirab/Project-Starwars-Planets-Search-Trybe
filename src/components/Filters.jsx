import React, { useContext, useState } from 'react';
import FiltersContext from '../context/FiltersContext';
import Input from './Input';

function Filters() {
  const [name, setName] = useState('');
  const { filterByText } = useContext(FiltersContext);

  filterByText(name);

  return (
    <div>
      <Input
        type="text"
        value={ name }
        testid="name-filter"
        onChange={ (event) => setName(event.target.value) }
      />
    </div>
  );
}

export default Filters;
