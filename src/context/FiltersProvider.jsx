import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FiltersContext from './FiltersContext';

function FiltersProvider({ children }) {
  const [filtersObject, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  const filterByText = (text) => {
    setFilters({ ...filtersObject, name: text });
  };

  return (
    <FiltersContext.Provider value={ { filtersObject, filterByText } }>
      {children}
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FiltersProvider;
