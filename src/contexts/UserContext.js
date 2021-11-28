import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../api';

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const data = await response.json();
    setData(data);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error (`Error: ${response.statusText}`);
      }

      const { token } = await response.json();

      localStorage.setItem('dogs:token', token);
      await getUser(token);

      navigate('/my-account');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  const userLogout = useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem('dogs:token');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem('dogs:token');
    
      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);

          const response = await fetch(url, options);

          if (response.ok) {
            throw new Error('Token inválido');
          }

          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }

    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        data,
        error,
        loading,
        login,
        userLogin,
        userLogout
      }}
    >
      {children}
    </UserContext.Provider>
  )
};

export {
  UserContext,
  UserStorage
};