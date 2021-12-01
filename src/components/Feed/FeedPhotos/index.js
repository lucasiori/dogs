import React, { useEffect } from 'react';
import { PHOTOS_GET } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import FeedPhotosItem from '../FeedPhotosItem';
import Error from '../../Error';
import Loading from '../../Loading';
import styles from './style.module.css';

const FeedPhotos = ({ user, page, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function fetchPhotos() {
      const totalPhotos = 6;
      const { url, options } = PHOTOS_GET({ page, total: totalPhotos, user });

      const { response, json } = await request(url, options);
    
      if (response && response.ok && json.length < totalPhotos) {
        setInfinite(false);
      }
    }

    fetchPhotos();
  }, [user, page, request, setInfinite]);

  if (error) return (<Error error={error} />);

  if (loading) return (<Loading />);

  if (data) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  }

  return null;
}

export default FeedPhotos;