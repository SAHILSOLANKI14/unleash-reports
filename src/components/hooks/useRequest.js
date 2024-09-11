import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import api from 'src/api';

const useRequest = (method, params = {}, options = {}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const cacheKey = JSON.stringify(params);
  const ref = useRef(
    useMemo(() => {
      return {
        cacheKey,
        isInitial: true,
      };
    }, []),
  );
  const { current: refData } = ref;
  const isInitial = refData.isInitial;
  const { skip } = options;

  ref.current.isInitial = false;

  useEffect(() => {
    const hasParamsChanged = refData.cacheKey !== cacheKey;
    if (hasParamsChanged) {
      ref.current.cacheKey = cacheKey;
    }
    if (options.skip) {
      setLoading(false);
    } else if (hasParamsChanged || (isInitial && !skip)) {
      request(params);
    }
  }, [skip, params]);

  const request = useCallback(
    async (queryParams) => {
      try {
        setLoading(true);
        setError(null);
        const result = await method(queryParams);
        if (options.onComplete) {
          options.onComplete(result);
        }
        setData(result);
        return result;
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [method],
  );

  const resend = () => request(params);

  const updateCache = (callback) => {
    setData(callback(data));
  };

  return [
    data,
    {
      data,
      loading,
      error,
      updateCache,
      refetch: resend,
    },
  ];
};

export default useRequest;
