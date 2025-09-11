import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // allow your client origin (adjust origin to client dev URL)
  app.enableCors({
    origin: 'http://localhost:5173', // change to your client dev port if different
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(3000);
  console.log('Server listening on http://localhost:3000');
}
bootstrap();
