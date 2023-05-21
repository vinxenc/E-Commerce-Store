import { env } from './env';

export const SERVER_PROPERTY = {
  databaseURI: env.DATABASE_URI,
  appId: env.SERVER_APP_ID,
  masterKey: env.SERVER_MASTER_KEY,
  serverURL: env.SERVER_URL,
};

export const DASHBOARD_PROPERTY = {
  apps: [
    {
      serverURL: env.SERVER_URL,
      appId: env.SERVER_APP_ID,
      masterKey: env.SERVER_MASTER_KEY,
      appName: env.SERVER_APP_NAME,
    },
  ],
  users: [
    {
      user: env.DASHBOARD_USERNAME,
      pass: env.DASHBOARD_PASSWORD,
    },
  ],
  trustProxy: env.DASHBOARD_TRUST_PROXY,
  useEncryptedPasswords: env.DASHBOARD_ENCRYPTED,
};

export const DASHBOARD_OPTIONS = {
  allowInsecureHTTP: env.DASHBOARD_INSECURE_HTTP,
  cookieSessionSecret: env.DASHBOARD_COOKIE_SESSION_SECRET,
};
