const next = require('next');
const express = require('express');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const config = require('./next.config');
const nextI18next = require('./i18n');

const {
  serverRuntimeConfig,
  publicRuntimeConfig,
} = config;

const {
  NODE_ENV,
  PORT,
} = serverRuntimeConfig;

const {
  ASSET_PREFIX,
} = publicRuntimeConfig;

const app = next({ dev: NODE_ENV === 'development' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('Starting express ...');
  console.log({ serverRuntimeConfig, publicRuntimeConfig });

  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get(`${ASSET_PREFIX}/static/*`, (req, _, nextCallback) => {
    req.url = req.originalUrl.replace(`${ASSET_PREFIX}/static`, '/static');
    nextCallback(); // be sure to let the next middleware handle the modified request.
  });

  server.get(`${ASSET_PREFIX}/_next/*`, (req, _, nextCallback) => {
    req.url = req.originalUrl.replace(`${ASSET_PREFIX}/_next`, '/_next');
    nextCallback();
  });

  server.get('*', handle);

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`\n🍺  Ready ... on http://localhost:${PORT}`);
  });
});
