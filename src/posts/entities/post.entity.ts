import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class PostItem {
  @Prop()
  title: string;

  @Prop()
  description: string;

  // @Prop()
  // author:
}

export type PostDocument = PostItem & mongoose.Document;
export const PostEntity = SchemaFactory.createForClass(PostItem);
