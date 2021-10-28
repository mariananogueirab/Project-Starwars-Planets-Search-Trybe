import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <div>
      <PlanetsProvider>
        <Filters />
        <Table />
      </PlanetsProvider>
    </div>
  );
}

export default App;
