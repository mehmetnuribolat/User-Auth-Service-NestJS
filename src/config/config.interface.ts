export interface ConfigAuth {
  JWT_EXPIRES_IN: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
}

export interface ConfigSwagger {
  SWAGGER_USERNAME: string;
  SWAGGER_PASSWORD: string;
}

export interface ConfigDatabase {
  MONGO_CONNECTION_STRING: string;
}

export interface ConfigMail {
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_SECURE: boolean;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
}

export interface ConfigData {
  env: string;
  host: string;
  port: number;
  db: ConfigDatabase;
  swagger: ConfigSwagger;
  auth: ConfigAuth;
  mail: ConfigMail;
  logLevel: string;
}
