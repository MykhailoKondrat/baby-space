import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindOneDto } from './dto/find-one.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findOne(@Query() query: FindOneDto) {
    return this.usersService.findOne(query);
  }

  @Post()
  async create(@Body() createUserDto) {
    return this.usersService.createOne(createUserDto);
  }
  @Patch('/:id')
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateOne(updateUserDto, id);
  }
}
