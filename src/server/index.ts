import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as ParseDashboard from 'parse-dashboard';
import * as createError from 'http-errors';
import * as root from 'app-root-path';
import * as morgan from 'morgan';

import { ParseServer } from 'parse-server';
import {
  DASHBOARD_OPTIONS,
  DASHBOARD_PROPERTY,
  SERVER_PROPERTY,
} from './parse';
import { router as signUp } from './page/signUp';

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
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(root.path, 'public')));

app.get('/', (_: express.Request, res: express.Response) => {
  res.send('Permission denied');
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const api = new ParseServer(SERVER_PROPERTY) as express.RequestHandler;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const dashboard = new ParseDashboard(
  DASHBOARD_PROPERTY,
  DASHBOARD_OPTIONS,
) as express.RequestHandler;

// Serve the Parse API on the /parse URL prefix
app.use('/api', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

app.use('/sign-up', signUp);

app.use(
  (_req: express.Request, _res: express.Response, next: express.NextFunction) =>
    next(createError(404)),
);

export default app;
