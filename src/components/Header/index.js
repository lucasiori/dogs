import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ReactComponent as Dogs } from '../../assets/dogs.svg';
import styles from './style.module.css';

const Header = () => {
  const { data } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo} aria-label="Dogs - Home">
          <Dogs />
        </Link>

        {data ? (
          <Link to="/my-account" className={styles.login}>
            {data.nome}
          </Link>
        ): (
          <Link to="/login" className={styles.login}>Login / Criar</Link>
        )}
      </nav>
    </header>
  )
}

export default Header;