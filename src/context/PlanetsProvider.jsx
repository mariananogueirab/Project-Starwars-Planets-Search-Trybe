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
    filters: {
      filterByName: {
        name: '',
      },
    },
  });
  const filterName = filtersObject.filters.filterByName.name;

  function setFilterByName(name) {
    const newFiltersObj = { ...filtersObject,
      filters: { ...filtersObject.filters,
        filterByName: { name },
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

  useEffect(() => {
    if (filterName !== '') {
      const planetsF = planets
        .filter((planet) => planet.name.toLowerCase().includes(filterName));
      setFilteredPlanets(planetsF);
    } else {
      setFilteredPlanets([...planets]);
    }
  }, [filterName, planets]);

  return (
    <PlanetsContext.Provider
      value={ { filteredPlanets, loading, setFilterByName, filtersObject, planets } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
