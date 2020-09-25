declare const __env: any;

export default {
  apiKey: __env.API_KEY,
  authDomain: __env.AUTH_DOMAIN,
  databaseURL: __env.DATABASE_URL,
  projectId: __env.PROJECT_ID,
  appId: __env.APP_ID,
  measurementId: __env.MEASUREMENT_ID,
};
