import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { PostDocument, PostItem } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostItem.name)
    private readonly postModel: Model<PostDocument>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = await this.postModel.create(createPostDto);
    return newPost;
  }

  async findAll() {
    return this.postModel.find().lean();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
