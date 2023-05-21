import path from 'path';
import express from 'express';
import cors from 'cors';
import ParseDashboard from 'parse-dashboard';
import createError from 'http-errors';
import root from 'app-root-path';
import morgan from 'morgan';

import { ParseServer } from 'parse-server';
import {
  DASHBOARD_OPTIONS,
  DASHBOARD_PROPERTY,
  SERVER_PROPERTY,
} from './parse';

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credential: true,
  preflightContinue: false,
  origin: '*',
  optionsSuccessStatus: 204,
};

const app = express();
app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' '),
  ),
);

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

console.log(path.join(root.path, 'public'));
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(root.path, 'public')));

// app.get('/', (_: express.Request, res: express.Response) => {
//   res.send('Permission denied');
// });

/** *************  Parse Server *****************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const server = new ParseServer(SERVER_PROPERTY);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
await server.start();
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const api = server.app as express.RequestHandler;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const dashboard = new ParseDashboard(
  DASHBOARD_PROPERTY,
  DASHBOARD_OPTIONS,
) as express.RequestHandler;

// Serve the Parse API on the /parse URL prefix
app.use('/api', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

/** *************  Parse Server *****************************************************************************/

app.use(
  (_req: express.Request, _res: express.Response, next: express.NextFunction) =>
    next(createError(404)),
);

export default app;
