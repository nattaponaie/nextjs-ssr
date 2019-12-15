import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import cache from 'memory-cache';

import { refresh } from './auth';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// if the access token expired but refresh token, try to refresh and re-request one more time
const autoRefreshAxios = createAuthRefreshInterceptor(
  axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }),
  refresh,
);

// make sure the same request will not be sent out rapidly
autoRefreshAxios.interceptors.request.use((config) => {
  const key = `${config.url}.${config.headers.atk}`;
  if (cache.get(key)) {
    return {
      ...config,
      cancelToken: new axios.CancelToken(cancel => cancel()),
    };
  }
  cache.put(key, true, 400);
  return config;
});

export {
  axiosInstance,
  autoRefreshAxios,
};
