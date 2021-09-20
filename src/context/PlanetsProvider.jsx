import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

// https://swapi-trybe.herokuapp.com/api/planets/?search=${name} ----- busca pelo nome. se não colocar nada depois do = busca tudo. Referência: documentação da api

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtersObject, setFilters] = useState({
    filters:
      {
        filterByName: {
          name: '',
        },
        filterByNumericValues: [],
      },
  });

  const filterName = filtersObject.filters.filterByName.name;
  const filterNumericValues = [...filtersObject.filters.filterByNumericValues];

  function setFilterByName(name) {
    const newFiltersObj = { ...filtersObject,
      filters: { ...filtersObject.filters,
        filterByName: { name },
      } };
    setFilters(newFiltersObj);
  }

  function setFilterByNumericValues(column, comparison, value) {
    const newFiltersObj = { ...filtersObject,
      filters: { ...filtersObject.filters,
        filterByNumericValues: [...filtersObject.filters.filterByNumericValues,
          {
            column,
            comparison,
            value,
          }],
      } };
    setFilters(newFiltersObj);
  }

  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch(STAR_WARS_API)
        .then((res) => res.json());
      setPlanets(results);
      setLoading(true);
    }
    fetchPlanets();
  }, []);

  function comparisonEquation(comp) {
    switch (comp) {
    case comp === 'maior que':
      return '>';
    case comp === 'menor que':
      return '<';
    case comp === 'iagual a':
      return '===';
    default:
      return '';
    }
  }

  useEffect(() => {
    // tenho o nome mas não tenho valor
    // tenho o nome e tenho valor
    // não tenho nome e tenho valor
    if (filterName !== '') {
      const planetsF = planets
        .filter((planet) => planet.name.toLowerCase().includes(filterName));
      setFilteredPlanets(planetsF);
    }
    /* if (filterName !== '' && filterNumericValues.length > 0) {
      let planetsFinal = [];


      const equacao = comparisonEquation(comparison);
      planetsFinal = [...planetsFinal, planets.filter((planet) => planet.name.toLowerCase().includes(filterName) && (planet[filterNumericValues[0].column] >= filterNumericValues[0].value.toString()))];

      console.log(planetsFinal);
      setFilteredPlanets(planetsFinal);
    } */ else {
      setFilteredPlanets([...planets]);
    }
  }, [filterName, filterNumericValues.length, planets]);

  return (
    <PlanetsContext.Provider
      value={ {
        filteredPlanets,
        loading,
        setFilterByName,
        filtersObject,
        planets,
        setFilterByNumericValues } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
