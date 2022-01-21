import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class PlaygroundItem {
  @Prop()
  testField: string;
}

export type PlayGroundItemDocument = PlaygroundItem & mongoose.Document;
export const PlaygroundItemSchema =
  SchemaFactory.createForClass(PlaygroundItem);
