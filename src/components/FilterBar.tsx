import React from 'react';
import styled from 'styled-components';
const FilterBar = () => {
  return <FilterBarContainer></FilterBarContainer>;
};

const FilterBarContainer = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  height: 100%;
`;

export default FilterBar;
