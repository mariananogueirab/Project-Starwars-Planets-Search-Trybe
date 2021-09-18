import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);

  planets.forEach((planet) => delete planet.residents);

  const renderColumns = (
    planets.length > 0 && Object.keys(planets[0])
      .map((columnName, index) => (
        <th key={ index }>{columnName}</th>
      ))
  );

  return (
    <div>
      {planets.length > 0 && (
        <table>
          <thead>
            <tr>
              {renderColumns}
            </tr>
          </thead>
          <tbody>

            {planets.map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet)
                  .map((item, index) => <td key={ index }>{item}</td>)}
              </tr>
            ))}

          </tbody>
        </table>)}
    </div>
  );
}

Table.contextType = PlanetsContext;

export default Table;
