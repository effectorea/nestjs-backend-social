import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { from, Observable } from 'rxjs';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly FeedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(feedPost: CreatePostDto): Observable<FeedPostEntity> {
    return from(this.FeedPostRepository.save(feedPost));
  }

  getAllPosts(): Observable<FeedPostEntity[]> {
    return from(this.FeedPostRepository.find());
  }

  findPosts(take: number = 10, skip: number = 0): Observable<FeedPostEntity[]> {
    return from(
      this.FeedPostRepository.findAndCount({ take, skip }).then((data) => {
        return data[0];
      }),
    );
  }

  async updatePost(
    id: number,
    feedPost: UpdatePostDto,
  ): Promise<FeedPostEntity[]> {
    await this.FeedPostRepository.update(id, feedPost);
    return await this.FeedPostRepository.findBy({
      id: id,
    });
  }

  async deletePost(id: number): Promise<FeedPostEntity[]> {
    const deletingPost = await this.FeedPostRepository.findBy({
      id: id,
    });
    await this.FeedPostRepository.delete({
      id: id,
    });
    return deletingPost;
  }
}
