import * as express from 'express';
import * as cors from 'cors';
import * as ParseDashboard from 'parse-dashboard';
import { ParseServer } from 'parse-server';
import * as path from 'path';
import {
  DASHBOARD_OPTIONS,
  DASHBOARD_PROPERTY,
  SERVER_PROPERTY,
} from './parse';
import { env } from '../../env';

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credential: true,
  preflightContinue: false,
  origin: '*',
  optionsSuccessStatus: 204,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (_: express.Request, res: express.Response) {
  res.send('Permission denied');
});
  
const api = new ParseServer(SERVER_PROPERTY);
const dashboard = new ParseDashboard(DASHBOARD_PROPERTY, DASHBOARD_OPTIONS);

// Serve the Parse API on the /parse URL prefix
app.use('/api', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

app.listen(env.PORT || 1337, () => {
	// tslint:disable-next-line
	console.log('server running on port 1337.');
});