import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Input from './Input';

function Filters() {
  const { setFilterByName,
    filtersObject: { filters: { filterByName: { name } } } } = useContext(PlanetsContext);

  return (
    <div>
      <Input
        type="text"
        value={ name }
        testid="name-filter"
        onChange={ (event) => setFilterByName(event.target.value) }
      />
    </div>
  );
}

export default Filters;
