import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Increase payload size limit to support Base64 rich text/images from editor
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  // Configure Helmet with relaxed cross-origin settings so frontend can load static uploaded assets from backend
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false,
    }),
  );

  // Configure CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new QueryFailedFilter());

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
