import { lazy, Suspense } from 'react';
import StartPage from '../pages/StartPage';
import Loader from '../components/Loader';

import { Navigate } from 'react-router-dom';
const HomePage = lazy(() => import('../pages/HomePage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

export const privateRoutes = [
  {
    path: '/players',
    element: (
      <Suspense fallback={<Loader />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/maps',
    element: (
      <Suspense fallback={<Loader />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/roles',
    element: (
      <Suspense fallback={<Loader />}>
        <HomePage />
      </Suspense>
    ),
  },

  { path: '*', element: <Navigate to='/players' replace={true} /> },
];

export const publicRoutes = [
  { path: '/', element: <StartPage /> },
  { path: '*', element: <Navigate to='/' replace={true} /> },
];
