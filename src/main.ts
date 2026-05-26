import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // =========================
  // 1. BODY SIZE LIMIT (for images/base64)
  // =========================
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  // =========================
  // 2. SECURITY HEADERS
  // =========================
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false,
    }),
  );

  // =========================
  // 3. CORS CONFIG (PRODUCTION SAFE)
  // =========================
  const allowedOrigins = [
    'https://pinrwanda.netlify.app',
    'https://pinrwanda.com',
    'https://www.pinrwanda.com',
    'http://localhost:3000',
    'http://localhost:3001',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // allow server-to-server or Postman
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return callback(null, true);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return callback(new Error('CORS blocked: Not allowed origin'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // =========================
  // 4. VALIDATION PIPE
  // =========================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // =========================
  // 5. START SERVER
  // =========================
  const port = process.env.PORT || 3002;
  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
