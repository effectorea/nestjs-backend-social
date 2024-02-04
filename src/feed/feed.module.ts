import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { FeedController } from './controllers/feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedPostEntity } from './models/post.entity';
import { AuthModule } from '../auth/auth.module';
import { IsCreatorGuard } from './guard/is-creator.guard';

@Module({
  providers: [FeedService, IsCreatorGuard],
  controllers: [FeedController],
  imports: [AuthModule, TypeOrmModule.forFeature([FeedPostEntity])],
})
export class FeedModule {}
