import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import {
  PlaygroundItem,
} from './entities/playground.entity';
import { CreatePlaygroundItemDto } from '../dto/playground';

@Controller('playground')
export class PlaygroundController {
  constructor(private playgroundService: PlaygroundService) {}
  @Get()
  async getAllItems(): Promise<PlaygroundItem[]> {
    return this.playgroundService.findMany();
  }
  @Post()
  async createOne(@Body() createPlaygroundItemDto: CreatePlaygroundItemDto) {
    return await this.playgroundService.createOne(createPlaygroundItemDto);
  }
}
