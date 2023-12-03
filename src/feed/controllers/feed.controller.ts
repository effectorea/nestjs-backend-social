import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FeedPostEntity } from '../models/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { from, Observable } from 'rxjs';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: FeedPostEntity })
  @Post()
  create(@Body() feedPost: CreatePostDto): Observable<FeedPostEntity> {
    return this.feedService.createPost(feedPost);
  }

  // @ApiOperation({ summary: 'Получение всех постов' })
  // @ApiResponse({ status: 200, type: [FeedPostEntity] })
  // @Get()
  // getPosts(): Observable<FeedPostEntity[]> {
  //   return this.feedService.getAllPosts();
  // }

  @ApiOperation({ summary: 'Получение всех постов' })
  @ApiResponse({ status: 200, type: [FeedPostEntity] })
  @Get()
  getSelectedPosts(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 1,
  ): Observable<FeedPostEntity[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }

  @ApiOperation({ summary: 'Редактирование поста' })
  @ApiResponse({ status: 200, type: [FeedPostEntity] })
  @Put(':id')
  updatePostById(
    @Param('id') id: number,
    @Body() feedPost: UpdatePostDto,
  ): Observable<FeedPostEntity[]> {
    return from(this.feedService.updatePost(id, feedPost));
  }

  @ApiOperation({ summary: 'Удаление поста' })
  @ApiResponse({ status: 200, type: [FeedPostEntity] })
  @Delete(':id')
  deletePostById(@Param('id') id: number): Observable<FeedPostEntity[]> {
    return from(this.feedService.deletePost(id));
  }
}
