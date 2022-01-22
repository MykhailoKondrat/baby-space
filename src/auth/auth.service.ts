import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/entities/user.entity';
import { DocumentDefinition } from 'mongoose';
import { LoginUserDto, NewUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MongoError } from 'mongodb';
import { MongoExceptionFilter } from '../filters/mongo.filter';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<DocumentDefinition<Omit<UserDocument, 'password'>>> {
    const user = await this.usersService.findOne({ username });

    console.log(user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const userData = await this.usersService.findOne({
      username: user.username,
    });
    const payload = { username: user.username, sub: userData._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async signUp(user: NewUserDto) {
    let newUser;
    newUser = await this.usersService.createOne(user);
    // try {
    //
    // } catch (e) {
    //   console.log('error message', e.code);
    // }
    // console.log(newUser);

    // // check email for uniq
    // hash password
    // create user in db with hashed password
    // save new user
    // return user without password and token
    return newUser;
  }
}
