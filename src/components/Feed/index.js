import React, { useState } from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = () => {
  const [modalPhoto, setModalPhoto] = useState(null);

  return (
    <>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>
      )}
      
      <FeedPhotos setModalPhoto={setModalPhoto} />
    </>
  );
}

export default Feed;