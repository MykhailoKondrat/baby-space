import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  UseFilters,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorators/isPublic';
import { NewUserDto } from './users/dto/userDto.dto';
import { MongoExceptionFilter } from './filters/mongo.filter';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @Get()
  hello() {
    return 'jello';
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseFilters(MongoExceptionFilter)
  @Public()
  @Post('/auth/create-account')
  async signUp(@Body() newUser: NewUserDto) {
    return this.authService.signUp(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
