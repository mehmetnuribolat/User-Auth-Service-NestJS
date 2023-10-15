import {
  ConfigAuth,
  ConfigData,
  ConfigDatabase,
  ConfigMail,
  ConfigSwagger,
} from './config.interface';
import { Injectable } from '@nestjs/common';
import { DEFAULT_CONFIG } from './config.default';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }
  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      host: env.HOST || DEFAULT_CONFIG.host,
      port: parseInt(env.PORT, 3001),
      db: this.parseDBConfig(env, DEFAULT_CONFIG.db),
      swagger: this.parseSwaggerConfig(env, DEFAULT_CONFIG.swagger),
      auth: this.parseAuthConfig(env, DEFAULT_CONFIG.auth),
      mail: this.parseMailConfig(env, DEFAULT_CONFIG.mail),
      logLevel: env.LOG_LEVEL,
    };
  }

  private parseDBConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigDatabase>,
  ) {
    return {
      MONGO_CONNECTION_STRING:
        env.MONGO_CONNECTION_STRING || defaultConfig.MONGO_CONNECTION_STRING,
    };
  }

  private parseAuthConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigAuth>,
  ) {
    return {
      JWT_EXPIRES_IN: env.JWT_EXPIRES_IN || defaultConfig.JWT_EXPIRES_IN,
      JWT_ACCESS_TOKEN_SECRET:
        env.JWT_ACCESS_TOKEN_SECRET || defaultConfig.JWT_ACCESS_TOKEN_SECRET,
      JWT_REFRESH_TOKEN_SECRET:
        env.JWT_REFRESH_TOKEN_SECRET || defaultConfig.JWT_REFRESH_TOKEN_SECRET,
      JWT_AUDIENCE: env.JWT_AUDIENCE || defaultConfig.JWT_AUDIENCE,
      JWT_ISSUER: env.JWT_AUDIENCE || defaultConfig.JWT_ISSUER,
    };
  }

  private parseSwaggerConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigSwagger>,
  ) {
    return {
      SWAGGER_USERNAME: env.SWAGGER_USERNAME || defaultConfig.SWAGGER_USERNAME,
      SWAGGER_PASSWORD: env.SWAGGER_PASSWORD || defaultConfig.SWAGGER_PASSWORD,
    };
  }
  private parseMailConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigMail>,
  ) {
    return {
      MAIL_HOST: env.MAIL_HOST || defaultConfig.MAIL_HOST,
      MAIL_PORT: parseInt(env.MAIL_PORT) || defaultConfig.MAIL_PORT,
      MAIL_SECURE: Boolean(env.MAIL_SECURE) || defaultConfig.MAIL_SECURE,
      MAIL_USER: env.MAIL_USER || defaultConfig.MAIL_USER,
      MAIL_PASSWORD: env.MAIL_PASSWORD || defaultConfig.MAIL_PASSWORD,
    };
  }

  public getMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.db.MONGO_CONNECTION_STRING,
    };
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
