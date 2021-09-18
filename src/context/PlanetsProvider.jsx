import React, { useEffect, useState } from 'react';
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

export default PlanetsProvider;
