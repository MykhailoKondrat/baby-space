import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env['PORT']);
}
bootstrap();

// todo
// 1.Connect mongo +
// 1.2 add config .env +
// 2. add CRUD on post entity + -
// 3. add search by query params @Query +
// 3.1 add search by partial query parms
// 3. add create account (try passport??)
// 4. add login
// 5. add guards for add post routea
// 6. add refresh token
// 7. connect users and posts
// 8. add logger for all requests and responses
// 9. how to store logs?
// 10. add hashing with bcrypt to auth

