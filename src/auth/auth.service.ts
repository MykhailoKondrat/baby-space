import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/entities/user.entity';
import { DocumentDefinition } from 'mongoose';
import { LoginUserDto, NewUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash/object';

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
    const newUserData = await this.usersService.createOne(user);
    const access_token = this.jwtService.sign({
      username: newUserData.username,
      newUserData: newUserData._id,
    });
    return {
      user: omit(newUserData.toJSON(), 'password'),
      access_token,
    };
  }
}
