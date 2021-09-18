import React, { useContext } from 'react';
import FiltersContext from '../context/FiltersContext';
import Input from './Input';

function Filters() {
  const { filtersObject, filterByText } = useContext(FiltersContext);
  console.log(filtersObject.filters)

  return (
    <div>
      <Input
        type="text"
        value={ filtersObject.filters.filterByName.name }
        testid="name-filter"
        onChange={ (event) => filterByText(event.target.value) }
      />
    </div>
  );
}

export default Filters;
