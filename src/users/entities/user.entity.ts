import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class UserItem {
  @Prop()
  username: string;

  @Prop()
  password: string;

  // @Prop()
  // author:
}

export type UserDocument = UserItem & mongoose.Document;
export const UserEntity = SchemaFactory.createForClass(UserItem);
