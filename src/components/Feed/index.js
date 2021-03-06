import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [pages, setPages] = useState([1]);
  const [infinite, setInfinite] = useState(true);

  useEffect(() => {
    let wait = false;

    function infiniteScroll() {
      if (!infinite) return;

      const scroll = window.scrollY;
      const height = document.body.offsetHeight - window.innerHeight;

      if (scroll > height * 0.75 && !wait) {
        setPages((prevPages) => [...prevPages, pages.length + 1]);
        wait = true;

        setTimeout(() => {
          wait = false;
        }, 500);
      }
    }
    
    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
  
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    }
  }, [pages, infinite]);

  return (
    <>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>
      )}
      
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
    </>
  );
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

Feed.defaultProps = {
  user: 0
}

export default Feed;