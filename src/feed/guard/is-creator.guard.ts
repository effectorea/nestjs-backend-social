import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { FeedService } from '../services/feed.service';
import { User } from '../../auth/models/user.interface';
import { FeedPost } from '../models/post.interface';
import { UserService } from '../../auth/services/user.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private feedService: FeedService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: User; params: { id: number } } = request;
    if (!user || !params) return false;
    if (user.role === 'admin') return true; //allows admin to get make requests
    const userId = user.id;
    const feedId = params.id;
    return this.userService.findUserById(userId).pipe(
      switchMap((user: User) =>
        this.feedService.findPostById(feedId).pipe(
          map((feedPost: FeedPost) => {
            return user.id === feedPost.author.id;
          }),
        ),
      ),
    );
  }
}
