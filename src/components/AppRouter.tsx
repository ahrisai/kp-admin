import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../redux';
import { privateRoutes, publicRoutes } from '../routes/routes';

const AppRouter = () => {
  const isAuth = useSelector((state: RootState) => state.userReducer.isAuth);

  return (
    <Routes>
      {isAuth
        ? privateRoutes.map((r) => <Route key={r.path} path={r.path} element={r.element} />)
        : publicRoutes.map((r) => <Route key={r.path} path={r.path} element={r.element} />)}
    </Routes>
  );
};

export default AppRouter;
