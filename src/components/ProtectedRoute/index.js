import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const ProtectedRoute = (props) => {
  const { login } = useContext(UserContext);

  if (login === true) return <Route {...props} />

  if (login === false) return <Navigate to="/login" />

  return null;
}

export default ProtectedRoute;