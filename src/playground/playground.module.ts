import { Module } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { PlaygroundController } from './playground.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PlaygroundItem,
  PlaygroundItemSchema,
} from './entities/playground.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlaygroundItem.name, schema: PlaygroundItemSchema },
    ]),
  ],
  providers: [PlaygroundService],
  controllers: [PlaygroundController],
})
export class PlaygroundModule {}
