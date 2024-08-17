/* eslint-disable react/prop-types */
import useAuth from '@/hooks/useAuth';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <TbFidgetSpinner />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={'/login'} state={location?.pathname} replace={true} />;
};

export default PrivateRoute;
