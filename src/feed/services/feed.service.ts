import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { from, Observable } from 'rxjs';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly FeedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(feedPost: CreatePostDto): Observable<FeedPostEntity> {
    return from(this.FeedPostRepository.save(feedPost));
  }

  async getAllPosts() {
    return await this.FeedPostRepository.find();
  }
}
