import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import FiltersContext from './FiltersContext';

const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/?search=';

// https://swapi-trybe.herokuapp.com/api/planets/?search=${name} ----- busca pelo nome. se não colocar nada depois do = busca tudo

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { filtersObject } = useContext(FiltersContext);
  const searchName = filtersObject.filters.filterByName.name;

  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch(`${STAR_WARS_API}${searchName}`)
        .then((res) => res.json());
      setPlanets(results);
      setLoading(true);
    }
    fetchPlanets();
  }, [searchName]);

  return (
    <PlanetsContext.Provider value={ { planets, loading } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
