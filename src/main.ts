import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted:true
      // forbidUnknownValues: true,
    }),
  );
  await app.listen(process.env['PORT']);
}
bootstrap();

// todo
// 2. add CRUD on post entity + -
// 10. add hashing with bcrypt to auth
// add create account endpoint

// 4. add login
// 6. add refresh token
// 7. connect users and posts
// 8. add logger for all requests and responses
// 9. how to store logs?
// 10. add hashing with bcrypt to auth
