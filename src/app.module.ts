import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaygroundModule } from './playground/playground.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PlaygroundModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
    PostsModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.API_KEY,
      signOptions: { expiresIn: process.env.JWT_EXP_TIME },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  // providers: [AppService],
})
export class AppModule {}
