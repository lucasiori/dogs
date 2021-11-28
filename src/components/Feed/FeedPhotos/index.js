import React, { useEffect } from 'react';
import { PHOTOS_GET } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import FeedPhotosItem from '../FeedPhotosItem';
import Error from '../../Error';
import Loading from '../../Loading';
import styles from './style.module.css';

const FeedPhotos = () => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });

      await request(url, options);
    }

    fetchPhotos();
  }, [request]);

  if (error) return (<Error error={error} />);

  if (loading) return (<Loading />);

  if (data) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem key={photo.id} photo={photo} />
        ))}
      </ul>
    );
  }

  return null;
}

export default FeedPhotos;