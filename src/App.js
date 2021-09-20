import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import FiltersProvider from './context/FiltersProvider';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <div>
      <FiltersProvider>
        <PlanetsProvider>
          <Filters />
          <Table />
        </PlanetsProvider>
      </FiltersProvider>

    </div>
  );
}

export default App;
