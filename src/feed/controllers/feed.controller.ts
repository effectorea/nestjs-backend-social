import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FeedPostEntity } from '../models/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { from, Observable } from 'rxjs';
import { UpdatePostDto } from '../dto/update-post.dto';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { IsCreatorGuard } from '../guard/is-creator.guard';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: FeedPostEntity })
  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(
    @Body() feedPost: CreatePostDto,
    @Request() req,
  ): Observable<FeedPostEntity> {
    return this.feedService.createPost(feedPost, req.user);
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
  @UseGuards(JwtGuard, IsCreatorGuard)
  @Put(':id')
  updatePostById(
    @Param('id') id: number,
    @Body() feedPost: UpdatePostDto,
  ): Observable<FeedPostEntity[]> {
    return from(this.feedService.updatePost(id, feedPost));
  }

  @ApiOperation({ summary: 'Удаление поста' })
  @ApiResponse({ status: 200, type: [FeedPostEntity] })
  @UseGuards(JwtGuard, IsCreatorGuard)
  @Delete(':id')
  deletePostById(@Param('id') id: number): Observable<FeedPostEntity[]> {
    return from(this.feedService.deletePost(id));
  }

  @Get('image/:fileName')
  findImageByFileName(@Param('fileName') fileName: string, @Res() res) {
    if (!fileName || ['null', '[null]'].includes(fileName)) return;
    return res.sendFile(fileName, { root: './images' });
  }
}
