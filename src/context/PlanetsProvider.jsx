import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

// https://swapi-trybe.herokuapp.com/api/planets/?search=${name} ----- busca pelo nome. se não colocar nada depois do = busca tudo. Referência: documentação da api

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currFilterByNum, setCurrFilterByNum] = useState({});
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
    setCurrFilterByNum({
      column,
      comparison,
      value,
    });
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

  useEffect(() => {
    if (filterName !== '') {
      const planetsF = planets
        .filter((planet) => planet.name.toLowerCase().includes(filterName));
      setFilteredPlanets(planetsF);
    } else {
      setFilteredPlanets([...planets]);
    }
  }, [filterName, planets]);

  useEffect(() => {
    if (filterNumericValues.length > 0) {
      const { column, comparison, value } = currFilterByNum;
      const planetsFiltered = planets
        .filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[column]) > Number(value);
          } if (comparison === 'menor que') {
            return Number(planet[column]) < Number(value);
          } if (comparison === 'igual a') {
            return Number(planet[column]) === Number(value);
          }
          return false;
        });
      setFilteredPlanets(planetsFiltered);
    }
  }, [currFilterByNum, planets, filterNumericValues]);

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
