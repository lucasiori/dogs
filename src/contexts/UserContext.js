import React, { createContext, useState } from 'react';
import { TOKEN_POST, USER_GET } from '../api';

const UserContext = createContext();

const UserStorage = ({ children }) => {
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
    const { url, options } = TOKEN_POST({ username, password });

    const response = await fetch(url, options);
    const { token } = await response.json();

    localStorage.setItem('dogs:token', token);
    getUser(token);
  }

  return (
    <UserContext.Provider value={{ data, userLogin }}>
      {children}
    </UserContext.Provider>
  )
};

export {
  UserContext,
  UserStorage
};