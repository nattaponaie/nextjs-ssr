import axios from 'axios';
import router from 'next/router';
import {
  useContext,
  useEffect,
} from 'react';

import { GATEWAY_PREFIX } from '/config';
import { UserContext } from '/contexts/UserContext';
import { autoRefreshAxios } from '/utils/axios';

const useAuthentication = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    autoRefreshAxios.get(`${GATEWAY_PREFIX}/api/auth/v1.0/info`)
      .then(({ data }) => {
        dispatch({
          type: 'info',
          userinfo: data,
        });
      }).catch((e) => {
        if (!(e instanceof axios.Cancel)) {
          router.replace('/account/login');
        }
      });
  }, []);
};

export {
  useAuthentication,
};
