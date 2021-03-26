declare namespace NodeJS {
  export interface ProcessEnv {
    APP_PORT?: string;
    NODE_ENV?: string;
    AUTH_SECRET?: string;
    AUTH_EXPIRES_IN?: string;
    DB_HOST?: string;
    DB_USER?: string;
    DB_PASS?: string;
    DB_NAME?: string;
  }
}
