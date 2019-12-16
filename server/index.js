import bodyParser from 'body-parser';
import express from 'express';
import nextjs from 'next';

// import { logInfo } from './utils/logger';

// import {
//   defaultApi,supportApis,
// } from './api';
// import models from './database/models';
// import {
//   NODE_ENV, PORT,
// } from './server-config';

const port = parseInt(3001, 10) || 8080;
// const dev = NODE_ENV === 'development';
const dev = true;
const app = nextjs({ dev });
const handle = app.getRequestHandler();
const server = express();

app.prepare().then(async () => {
  // middleware
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // route
  server.use((req, _, next) => {
    req.app = app;
    next();
  });

  // Register API routes
  // supportApis.forEach((api) => {
  //   server.use(`/api/v${api.version}`, api.router);
  // });
  // server.use('/api', defaultApi.router);

  server.get('/static/*', (req, _, next) => {
    req.url = req.originalUrl.replace('/static', 'static');
    next(); // be sure to let the next middleware handle the modified request.
  });
  server.get('/_next/*', (req, _, next) => {
    req.url = req.originalUrl.replace('/_next', '_next');
    next(); // be sure to let the next middleware handle the modified request.
  });
  server.get('*', (req, res) => handle(req, res));

  // models.sequelize
  //   .authenticate()
  //   .then(() => {
  //     logInfo('Connection has been established successfully.');
  //   })
  //   .catch(err => {
  //     logError('Unable to connect to the database:', err);
  // });

  server.listen(port, (err) => {
    if (err) throw err;
    // logInfo(`> Ready on http://localhost:${port}`);
    console.log('> Ready on http://localhost:3001');

  });
});

export default server;
