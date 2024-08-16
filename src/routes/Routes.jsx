import Root from '@/Layouts/Root';
import Register from '@/pages/auth/Register';
import Home from '@/pages/home/Home';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
