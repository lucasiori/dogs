import React, { useEffect } from 'react';
import { PHOTO_GET } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import Error from '../../Error';
import Loading from '../../Loading';
import PhotoContent from '../../Photo/PhotoContent';
import styles from './style.module.css';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);

    request(url, options);
  }, [photo, request]);

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
}

export default FeedModal;