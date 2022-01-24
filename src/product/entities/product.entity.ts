import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductCategories, ProductGender } from '../../types/dictionary';
import * as mongoose from 'mongoose';
import { UserItem } from '../../users/entities/user.entity';
import { Type } from 'class-transformer';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true, enum: Object.values(ProductCategories) })
  category: string;

  @Prop({ enum: Object.values(ProductGender), default: ProductGender.UNISEX })
  gender: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserItem.name })
  @Type(() => UserItem)
  author: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product)
