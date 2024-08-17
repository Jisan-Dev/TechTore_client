import Root from '@/Layouts/Root';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Home from '@/pages/home/Home';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
]);
