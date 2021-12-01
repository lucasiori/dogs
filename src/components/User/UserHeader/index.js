import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeaderNav from '../UserHeaderNav';
import styles from './style.module.css';

const UserHeader = () => {
  const { pathname } = useLocation();

  const [title, setTitle] = useState('');

  useEffect(() => {
    switch(pathname) {
      case '/my-account/post':
        setTitle('Poste Sua Foto');
        break;
      case '/my-account/stats':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha Conta');
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
}

export default UserHeader;