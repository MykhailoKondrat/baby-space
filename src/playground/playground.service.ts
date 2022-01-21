import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  PlaygroundItem,
  PlayGroundItemDocument,
} from './entities/playground.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlaygroundItemDto } from '../dto/playground';

@Injectable()
export class PlaygroundService {
  constructor(
    @InjectModel(PlaygroundItem.name)
    private readonly playgroundItemModel: Model<PlayGroundItemDocument>,
  ) {}
  async findMany() {
    return this.playgroundItemModel.find().lean();
  }
  async createOne(createPlaygroundItemDto: CreatePlaygroundItemDto) {
    const createdItem = await this.playgroundItemModel.create(
      createPlaygroundItemDto,
    );
    await createdItem.save();
    return createdItem;
  }
}
