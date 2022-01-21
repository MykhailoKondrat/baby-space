import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserItem } from './entities/user.entity';
import { FindOneDto } from './dto/find-one.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findOne(@Query() query: FindOneDto): Promise<UserItem> {
    return this.usersService.findOne(query);
  }
  @Post()
  async create(@Body() createUserDto: LoginUserDto): Promise<UserItem> {
    return this.usersService.createOne(createUserDto);
  }
}
