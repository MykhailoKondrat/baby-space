import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostItem, PostEntity } from './entities/post.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostItem.name, schema: PostEntity }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

console.log(process.env['MONGO_DB']);
