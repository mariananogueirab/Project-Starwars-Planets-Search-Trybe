import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

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
        <table>
          <thead>
            <tr>
              {renderColumns}
            </tr>
          </thead>
          <tbody>

            {filteredPlanets.map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet)
                  .map((item, index) => <td key={ index }>{item}</td>)}
              </tr>
            ))}

          </tbody>
        </table>) : 'loading'}
    </div>
  );
}

Table.contextType = PlanetsContext;

export default Table;
