import React from 'react';
import { PHOTO_DELETE } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import styles from './style.module.css';

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja deletar?');

    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);

      const { response } = await request(url, options);

      if (response.ok) {
        window.location.reload();
      }
    }
  }

  return (
    <button
      className={styles.delete}
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? 'Deletando...' : 'Deletar'}
    </button>
  );
}

export default PhotoDelete;