import React, { lazy, useEffect, Suspense } from 'react';
import { STATS_GET } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import Head from '../../Head';
import Loading from '../../Loading';
import Error from '../../Error';

const UserStatsGraphs = lazy(() => import('../UserStatsGraphs'));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();

      await request(url, options);
    }

    getData();
  }, [request]);

  if (loading) return (<Loading />);

  if (error) return (<Error error={error} />);

  if (data) {
    return (
      <Suspense fallback={<div />}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </Suspense>
    );
  }

  return null;
}

export default UserStats;