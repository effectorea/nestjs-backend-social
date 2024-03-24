import { Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Brackets, Repository, UpdateResult } from 'typeorm';
import { FriendRequestEntity } from '../models/friend-request.entity';
import {
  FriendRequestInterface,
  FriendRequestStatus,
} from '../models/friend-request.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FriendRequestEntity)
    private readonly friendRequestRepository: Repository<FriendRequestEntity>,
  ) {}

  findUserById(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: ['feedPosts'],
      }),
    ).pipe(
      map((user: User) => {
        delete user.password;
        return user;
      }),
    );
  }

    findUserByIdWitoutRels(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: {
          id: id,
        },
      }),
    ).pipe(
      map((user: User) => {
        delete user.password;
        return user;
      }),
    );
  }

  updateImageById(id: number, imagePath: string): Observable<UpdateResult> {
    const user: User = new UserEntity();
    user.id = id;
    user.imagePath = imagePath;
    return from(this.userRepository.update(id, user));
  }

  findImageNameByUserId(id: number): Observable<string> {
    return from(
      this.userRepository.findOne({
        where: {
          id: id,
        },
      }),
    ).pipe(
      map((user: User) => {
        delete user.password;
        return user.imagePath;
      }),
    );
  }

  hasRequestBeenSentOrReceived(
    creator: User,
    receiver: User,
  ): Observable<boolean> {
    return from(
      this.friendRequestRepository.findOne({
        where: [
          { creator, receiver },
          { creator: receiver, receiver: creator },
        ],
      }),
    ).pipe(
      switchMap((friendRequest: FriendRequestInterface) => {
        console.log('This is a friend request', friendRequest);
        if (!friendRequest) return of(false);
        return of(true);
      }),
    );
  }

  sendFriendRequest(
    receiverId: number,
    creator: User,
  ): Observable<FriendRequestInterface | { error: string }> {
    if (receiverId === creator.id)
      return of({ error: 'It is not possible to add yourself' });

    return this.findUserByIdWitoutRels(receiverId).pipe(
      switchMap((receiver: User) => {
        return this.hasRequestBeenSentOrReceived(creator, receiver).pipe(
          switchMap((bool: boolean) => {
            if (bool)
              return of({
                error:
                  'The friend request has already been sent or received to your account!',
              });
            const friendRequest: FriendRequestInterface = {
              creator,
              receiver,
              status: 'pending',
            };
            return from(this.friendRequestRepository.save(friendRequest));
          }),
        );
      }),
    );
  }

  getFriendRequestStatus(
    receiverId: number,
    currentUser: User,
  ): Observable<FriendRequestStatus> {
    return this.findUserByIdWitoutRels(receiverId).pipe(
      switchMap((receiver: User) => {
        console.log('This is a receiver', receiver);
        return from(
          this.friendRequestRepository
            .createQueryBuilder('requests')
            .where('requests.creatorId= :currentUserId', {
              currentUserId: currentUser.id,
            })
            .andWhere('requests.receiverId= :receiverUserId', {
              receiverUserId: receiver.id,
            })
            .getOne(),
          // this.friendRequestRepository.findOne({
          //   where: { creator: currentUser, receiver: receiver },
          // }),
        );
      }),
      switchMap((friendRequest: FriendRequestInterface) => {
        console.log('friendRequest', friendRequest);
        return of({ status: friendRequest.status });
      }),
    );
  }
}
