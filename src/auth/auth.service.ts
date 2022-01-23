import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/entities/user.entity';
import { DocumentDefinition } from 'mongoose';
import { UserDtoDto, NewUserDto } from '../users/dto/userDto.dto';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash/object';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<DocumentDefinition<Omit<UserDocument, 'password'>>> {
    const user = await this.usersService.findOne({ email });
    console.log(user);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.comparePassword(password)) {
      return user;
    }
    return null;
  }

  async login(user: UserDtoDto) {
    const userData = await this.usersService.findOne({
      email: user.email,
    });
    const payload = { email: user.email, sub: userData._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: NewUserDto) {
    const newUserData = await this.usersService.createOne(user);
    const access_token = this.jwtService.sign({
      username: newUserData.username,
      newUserData: newUserData._id,
    });
    return {
      user: omit(newUserData, 'password'),
      access_token,
    };
  }
}
