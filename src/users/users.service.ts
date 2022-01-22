import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserItem } from './entities/user.entity';
import { LoginUserDto, NewUserDto } from './dto/login-user.dto';
import { DocumentDefinition, FilterQuery, Model } from 'mongoose';
import { MongoError } from 'mongodb';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoExceptionFilter } from '../filters/mongo.filter';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserItem.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createOne(createUserDto: NewUserDto) {
    const newUser = await this.userModel.create({ ...createUserDto });
    return await newUser.save();
  }

  async findOne(
    query: FilterQuery<UserDocument>,
  ): Promise<DocumentDefinition<UserDocument>> | never {
    const result = await this.userModel.findOne(query).lean();
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'user not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
