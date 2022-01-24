import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserItem } from './entities/user.entity';
import { NewUserDto } from './dto/userDto.dto';
import { DocumentDefinition, FilterQuery, Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserItem.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createOne(
    createUserDto: NewUserDto,
  ): Promise<DocumentDefinition<UserDocument>> {
    const newUser = await this.userModel.create(createUserDto);
    const result = await newUser.save();
    return result.toObject();
  }

  async findOne(
    query: FilterQuery<UserDocument>,
  ): Promise<DocumentDefinition<UserDocument>> | never {
    const result = await this.userModel.findOne(query);

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

  async updateOne(updateUserQuery: UpdateUserDto, id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException(
        {
          message: `${id} is not valid ID`,
        },
        400,
      );
    }
    const user = await this.userModel
      .findByIdAndUpdate({ _id: id }, updateUserQuery, { new: true })
      .lean();

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
