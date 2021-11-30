import React, { useContext } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginForgotPassword from './LoginForgotPassword';
import LoginResetPassword from './LoginResetPassword';
import NotFound from '../NotFound';
import styles from './style.module.css';

const Login = () => {
  const { login } = useContext(UserContext);

  if (login === true) {
    return <Navigate to="/my-account" />
  }

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
          <Route path="forgot-password" element={<LoginForgotPassword />} />
          <Route path="reset-password" element={<LoginResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}

export default Login;