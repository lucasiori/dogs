import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import PhotoComments from '../PhotoComments';
import PhotoDelete from '../PhotoDelete';
import Image from '../../Image';
import styles from './style.module.css';

const PhotoContent = ({ data }) => {
  const context = useContext(UserContext);

  const { photo, comments } = data;
  
  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {context.data && context.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>
            )}
            
            <span className={styles.views}>{photo.acessos}</span>
          </p>

          <h1 className="title">
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
          </h1>

          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} {photo.idade === 1 ? 'ano' : 'anos'}</li>
          </ul>
        </div>
      </div>

      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
}

export default PhotoContent;