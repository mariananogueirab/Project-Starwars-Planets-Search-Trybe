import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Input from './Input';
import Select from './Select';
import './filters.css';

function Filters() {
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const { setFilterByName,
    filtersObject: { filters: { filterByName: { name } } },
    setFilterByNumericValues } = useContext(PlanetsContext);
  const columnOptions = (
    ['', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const comparisonOptions = ['', 'maior que', 'menor que', 'igual a'];

  return (
    <div className="container">
      <Input
        label="Filtrar pelo nome"
        type="text"
        value={ name }
        testid="name-filter"
        onChange={ (event) => setFilterByName(event.target.value) }
      />

      <Select
        label="Filtrar por coluna"
        options={ columnOptions }
        testid="column-filter"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
      />

      <Select
        label="Filtrar por comparação"
        options={ comparisonOptions }
        testid="comparison-filter"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
      />

      <Input
        label="Filtrar por número"
        type="number"
        value={ value }
        testid="value-filter"
        onChange={ (event) => setValue(event.target.value) }
      />

      <button
        type="button"
        onClick={ () => setFilterByNumericValues(column, comparison, value) }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
