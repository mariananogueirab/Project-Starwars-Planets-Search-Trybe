import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch(`${STAR_WARS_API}planets`)
        .then((res) => res.json());
      setPlanets(results);
    }
    fetchPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
