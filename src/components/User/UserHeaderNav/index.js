import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { ReactComponent as MyPhotos } from '../../../assets/feed.svg';
import { ReactComponent as Stats } from '../../../assets/stats.svg';
import { ReactComponent as AddPhoto } from '../../../assets/add.svg';
import { ReactComponent as Logout } from '../../../assets/logout.svg';
import styles from './style.module.css';

const UserHeaderNav = () => {
  const [mobile, setMobile] = useState(null);
  const { userLogout } = useContext(UserContext);

  return (
    <nav className={styles.nav}>
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
  );
}

export default UserHeaderNav;