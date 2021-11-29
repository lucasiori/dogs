import React, { useState } from 'react';
import { COMMENT_POST } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import Error from '../../Error';
import { ReactComponent as Send } from '../../../assets/send.svg';
import styles from './style.module.css';

const PhotoCommentsForm = ({ id, setComments }) => {
  const { error, request } = useFetch();

  const [comment, setComment] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = COMMENT_POST(id, { comment });

    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        id="comment"
        name="comment"
        placeholder="Comente..."
        className={styles.textarea}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />

      <button className={styles.button}>
        <Send />
      </button>

      {error && <Error error={error} />}
    </form>
  );
}

export default PhotoCommentsForm;