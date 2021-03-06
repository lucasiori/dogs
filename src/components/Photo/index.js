import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Error';
import Loading from '../Loading';
import PhotoContent from './PhotoContent';
import Head from '../Head';

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(id);

    request(url, options);
  }, [id, request]);

  if (error) return (<Error  error={error} />);

  if (loading) return (<Loading />);

  if (data) {
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        
        <PhotoContent data={data} single />
      </section>
    )
  }

  return null;
}

export default Photo;