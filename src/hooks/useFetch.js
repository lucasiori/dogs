import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const request = useCallback(async (url, options) => {
    let response;
    let responseJson;

    try {
      setError(null);
      setLoading(true);

      response = await fetch(url, options);
      responseJson = await response.json(); 

      if (!response.ok) {
        throw new Error(responseJson.message);
      }
    } catch (err) {
      responseJson = null;
      setError(err.message);
    } finally {
      setData(responseJson);
      setLoading(false);
      
      return { response, json: responseJson };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request
  };
}

export default useFetch;