import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../redux';
import Table from '../consts/Table';
import fetchPlayers from '../redux/playerThunks/fetchPlayers';

const MainTable = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (location.pathname === '/players') {
      dispatch(fetchPlayers('asc'));
    }
    if (location.pathname === '/maps') {
      //dispatch(fetchPlayers)
    }
    if (location.pathname === '/roles') {
      //dispatch(fetchPlayers)
    }
  }, [location]);
  const CurrentTable = Table[location.pathname];
  return <CurrentTable />;
};

export default MainTable;
