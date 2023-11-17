import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly FeedPostRepository: Repository<FeedPostEntity>,
  ) {}

  async createPost(feedPost: CreatePostDto) {
    return await this.FeedPostRepository.save(feedPost);
  }
}
