import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../../api';
import useForm from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Error from '../../Error';
import Head from '../../Head';
import styles from './style.module.css';

const UserPhotoPost = () => {
  const { data, error, loading, request } = useFetch();
  const name = useForm();
  const weight = useForm();
  const age = useForm();
  const navigate = useNavigate();

  const [image, setImage] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('img', image.raw);
    formData.append('nome', name.value);
    formData.append('peso', weight.value);
    formData.append('idade', age.value);

    const token = localStorage.getItem('dogs:token');
    const { url, options } = PHOTO_POST(formData, token);

    request(url, options);
  }

  function handleImageChange({ target }) {
    setImage({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0]),
    });
  }

  useEffect(() => {
    if (data) {
      navigate('/my-account');
    }
  }, [data, navigate]);

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />

      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="name" {...name} />
        <Input label="Peso" type="number" name="weight" {...weight} />
        <Input label="Idade" type="number" name="age" {...age} />
        <input
          type="file"
          name="image"
          id="image"
          className={styles.file}
          onChange={handleImageChange}
        />

        <Button disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>

        <Error error={error} />
      </form>

      <div>
        {image.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${image.preview}')` }}
          />
        )}
      </div>
    </section>
  );
}

export default UserPhotoPost;