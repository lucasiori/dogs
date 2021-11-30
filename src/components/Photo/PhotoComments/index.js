import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import PhotoCommentsForm from '../PhotoCommentsForm';
import styles from './style.module.css';

const PhotoComments = ({ id, comments: commentsProps, single }) => {
  const { login } = useContext(UserContext);
  const commentsSectionRef = useRef(null);

  const [comments, setComments] = useState(() => commentsProps);

  useEffect(() => {
    commentsSectionRef.current.scrollTop = commentsSectionRef.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSectionRef}
        className={`${styles.comments} ${single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <strong>{comment.comment_author}: </strong>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>

      {login && (
        <PhotoCommentsForm
          id={id}
          single={single}
          setComments={setComments}
        />
      )}
    </>
  );
}

export default PhotoComments;