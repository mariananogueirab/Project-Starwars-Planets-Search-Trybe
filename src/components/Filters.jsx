import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Input from './Input';
import Select from './Select';
import './filters.css';

function Filters() {
  const [columnValue, setColumn] = useState('');
  const [columnsOptions, setColumnsOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [sortColumns, setSortColumns] = useState('');
  const [comparisonValue, setComparison] = useState('');
  const [valueValue, setValue] = useState('');
  const { setFilterByName,
    filtersObject,
    setFilterByNumericValues } = useContext(PlanetsContext);
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];
  const { filters: { filterByName: { name } } } = filtersObject;
  const { filters: { filterByNumericValues } } = filtersObject;
  const optionsOfColumns = (
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      filterByNumericValues
        .forEach(({ column }) => {
          setColumnsOptions((prevState) => prevState
            .filter((columnOp) => columnOp !== column));
        });
    }
  }, [filterByNumericValues]);

  /* function handleXClick({ target }) {
    const index = filterByNumericValues.findIndex(({ column, comparison, value }) => column === target.value || comparison === target.value || value === target.value);
    console.log(index)
  } */

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
        options={ columnsOptions }
        testid="column-filter"
        value={ columnValue }
        onChange={ (e) => setColumn(e.target.value) }
      />
      <button type="button">X</button>

      <Select
        label="Filtrar por comparação"
        options={ comparisonOptions }
        testid="comparison-filter"
        value={ comparisonValue }
        onChange={ (e) => setComparison(e.target.value) }
      />
      <button type="button">X</button>

      <Input
        label="Filtrar por número"
        type="number"
        value={ valueValue }
        testid="value-filter"
        onChange={ (event) => setValue(event.target.value) }
      />
      <button type="button">X</button>

      <button
        type="button"
        onClick={ () => (
          setFilterByNumericValues(columnValue, comparisonValue, valueValue)) }
        data-testid="button-filter"
      >
        Filtrar
      </button>

      <Select
        label="Coluna a ser ordenada"
        options={ optionsOfColumns }
        testid="column-sort"
        value={ sortColumns }
        onChange={ (e) => setSortColumns(e.target.value) }
      />
      <Input
        label="ASC"
        type="radio"
        /* value={  } */
        testid="column-sort-input-asc"
        /* onChange={  } */
        name="sort"
      />
      <Input
        label="DESC"
        type="radio"
        /* value={  } */
        testid="column-sort-input-desc"
        /* onChange={  } */
        name="sort"
      />
    </div>
  );
}

export default Filters;
