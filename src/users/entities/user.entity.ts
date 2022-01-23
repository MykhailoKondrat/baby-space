import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Nullable } from '../../../global';

@Schema({ timestamps: true })
export class UserItem {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null, type: String })
  phoneNumber: Nullable<string>;

  @Prop({ default: null, type: String })
  about: Nullable<string>;

  comparePassword: (candidatePassword: string) => boolean;
}

export type UserDocument = UserItem & mongoose.Document;
export const UserEntity = SchemaFactory.createForClass(UserItem);

UserEntity.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
});

UserEntity.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const user = this as UserDocument;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((e: any) => false);
};
