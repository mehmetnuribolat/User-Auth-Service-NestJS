import { INestApplication } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';
import { ConfigService } from '../config';

const SWAGGER_ENVS = ['local', 'development', 'production'];

export function createSwaggerDocument(app: INestApplication) {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'authorization',
    )
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version);

  const options = builder.build();
  const env = app.get(ConfigService).get().env;

  const { SWAGGER_USERNAME, SWAGGER_PASSWORD }: any = app
    .get(ConfigService)
    .get().swagger;

  if (SWAGGER_ENVS.includes(env)) {
    app.use(
      '/docs',
      basicAuth({
        challenge: true,
        users: {
          [SWAGGER_USERNAME]: SWAGGER_PASSWORD,
        },
      }),
    );
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }
}
