import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  host: 'localhost',
  port: Number(process.env.PORT || 3000),
  db: {
    MONGO_CONNECTION_STRING: '',
  },
  auth: {
    JWT_EXPIRES_IN: '1d',
    JWT_ACCESS_TOKEN_SECRET: '',
    JWT_REFRESH_TOKEN_SECRET: '',
    JWT_AUDIENCE: 'user_service_app',
    JWT_ISSUER: 'user_service_app',
  },
  swagger: {
    SWAGGER_USERNAME: '',
    SWAGGER_PASSWORD: '',
  },
  mail: {
    MAIL_HOST: 'smtp.gmail.com',
    MAIL_PORT: 587,
    MAIL_SECURE: false,
    MAIL_USER: '',
    MAIL_PASSWORD: '',
  },
  logLevel: '',
};
