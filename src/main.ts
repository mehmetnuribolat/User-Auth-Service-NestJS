import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './app/adapter/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './app/adapter/interceptors/response.interceptor';
import { createSwaggerDocument } from './docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  //pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  //Insert Swagger Documentation
  createSwaggerDocument(app);

  await app.listen(process.env.PORT);
}
bootstrap();
