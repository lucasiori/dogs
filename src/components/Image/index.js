import React, { useState } from 'react';
import styles from './style.module.css';

const Image = ({ alt, ...rest }) => {
  const [skeleton, setSkeleton] = useState(true);

  function handleLoad() {
    setSkeleton(false);
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton} />}

      <img
        className={`${styles.img} ${!skeleton ? styles.visible : ''}`}
        alt={alt}
        onLoad={handleLoad}
        {...rest}
      />
    </div>
  );
}

export default Image;