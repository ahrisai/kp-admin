import styled from 'styled-components';
import Container from '../components/Container';
import Modal from '../components/Modal';
import { RootState, useAppDispatch } from '../redux';
import { changeGameProfileState } from '../redux/modalSlice';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainTable from '../components/MainTable';
import FilterBar from '../components/FilterBar';
import { Pagination } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <Main>
        <MainContent>
          <SideNavbar>
            <NavLink to={'/players'}>PLAYERS</NavLink>
            <NavLink to={'/maps'}>MAPS</NavLink>
            <NavLink to={'/roles'}>ROLES</NavLink>
          </SideNavbar>
          <MainTable />
          <FilterBar />
        </MainContent>
        <Pagination color='secondary' />
      </Main>
    </>
  );
};

const Main = styled.main`
  background-color: #333;
`;

const MainContent = styled.div`
  height: 80vh;
  display: flex;
  justify-content: space-between;
`;

const SideNavbar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: aliceblue;
  height: 100%;
  width: 9%;
`;

const NavLink = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  color: #000;
  font-weight: 700;
  &:hover {
    color: #757575;
  }
`;

export default HomePage;
