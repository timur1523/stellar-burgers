import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthorisation = false;
  const location = useLocation();
  if (!onlyUnAuth && !isAuthorisation) {
    return <Navigate to='/login' />;
  }

  if (onlyUnAuth && isAuthorisation) {
    // const from = location.state?.from || { pathname: '/' };
    return <Navigate to='/' />;
  }
  return <>{children}</>;
};
