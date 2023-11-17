import { Body, Controller, Post } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FeedPostEntity } from '../models/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { Observable } from 'rxjs';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: FeedPostEntity })
  @Post()
  create(@Body() feedPost: CreatePostDto): Observable<FeedPostEntity> {
    return this.feedService.createPost(feedPost);
  }
}
