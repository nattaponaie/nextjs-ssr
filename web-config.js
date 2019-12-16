import getConfig from 'next/config';

export const {
  publicRuntimeConfig: {
    ASSET_PREFIX,
    API_PREFIX,
    DEV_MODE,
    NODE_ENV,
    PORT,
  },
} = getConfig();
