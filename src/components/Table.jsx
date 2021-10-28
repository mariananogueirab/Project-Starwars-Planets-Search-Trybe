import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './table.css';

function Table() {
  const { filteredPlanets, loading, planets } = useContext(PlanetsContext);

  filteredPlanets.forEach((planet) => delete planet.residents);

  const renderColumns = (
    loading && Object.keys(planets[0])
      .map((columnName, index) => (
        <th key={ index }>{columnName}</th>
      ))
  );

  return (
    <div>
      {loading ? (
        <table className="table">
          <thead>
            <tr>
              {renderColumns}
            </tr>
          </thead>
          <tbody>

            {filteredPlanets.map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet)
                  .map((item, index) => (
                    index === 0 ? <td key={ index } data-testid="planet-name">{item}</td>
                      : <td key={ index }>{item}</td>
                  ))}
              </tr>
            ))}

          </tbody>
        </table>) : 'loading'}
    </div>
  );
}

export default Table;
