import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import useMedia from '../../../hooks/useMedia';
import { ReactComponent as MyPhotos } from '../../../assets/feed.svg';
import { ReactComponent as Stats } from '../../../assets/stats.svg';
import { ReactComponent as AddPhoto } from '../../../assets/add.svg';
import { ReactComponent as Logout } from '../../../assets/logout.svg';
import styles from './style.module.css';

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);
  const mobile = useMedia('(max-width: 720px)');
  const { pathname } = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      <button
        aria-label="Menu"
        className={`
          ${styles.mobileButton}
          ${mobile ? styles.mobileButtonVisible : ''} 
          ${mobileMenu ? styles.mobileButtonActive : ''}
        `}
        onClick={() => setMobileMenu(!mobileMenu)}
      />

      <nav 
        className={
          `${mobile ? styles.navMobile : styles.nav} ${mobileMenu ? styles.navMobileActive : ''}
        `}
      >
        <NavLink to="/my-account" end>
          <MyPhotos />
          {mobile && 'Minhas Fotos'}
        </NavLink>

        <NavLink to="/my-account/stats">
          <Stats />
          {mobile && 'Estatísticas'}
        </NavLink>

        <NavLink to="/my-account/post">
          <AddPhoto />
          {mobile && 'Adicionar Foto'}
        </NavLink>

        <button onClick={userLogout}>
          <Logout />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
}

export default UserHeaderNav;