import * as dotenv from 'dotenv';
import { cleanEnv, str, bool, num } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: num(),
  DATABASE_URI: str(),
  SERVER_APP_ID: str(),
  SERVER_MASTER_KEY: str(),
  SERVER_URL: str(),
  SERVER_APP_NAME: str(),
  DASHBOARD_USERNAME: str(),
  DASHBOARD_PASSWORD: str(),
  DASHBOARD_TRUST_PROXY: num(),
  DASHBOARD_ENCRYPTED: bool(),
  DASHBOARD_INSECURE_HTTP: bool(),
  DASHBOARD_COOKIE_SESSION_SECRET: str(),
});
