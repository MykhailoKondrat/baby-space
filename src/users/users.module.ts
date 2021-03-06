import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserItem, UserEntity } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserItem.name, schema: UserEntity }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

// imports: [
//   MongooseModule.forFeature([{ name: UserItem.name, schema: PostEntity }]),
// ],
//   controllers: [PostsController],
//   providers: [PostsService],
