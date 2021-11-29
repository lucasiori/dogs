import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const ProtectedRoute = ({ element: Element }) => {
  const { login } = useContext(UserContext);

  if (login === true) return <Element />;

  return <Navigate to="/login" />;
}

export default ProtectedRoute;