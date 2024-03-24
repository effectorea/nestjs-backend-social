import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { FriendRequest_Status } from './friend-request.interface';

@Entity('requests')
export class FriendRequestEntity {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Пользователь, отправивший запрос',
  })
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.sentFriendRequests)
  creator: UserEntity;

  @ApiProperty({
    example: '5',
    description: 'Пользователь, кому отправлен запрос',
  })
  @ManyToOne(
    () => UserEntity,
    (userEntity) => userEntity.receivedFriendRequests,
  )
  receiver: UserEntity;

  @ApiProperty({
    example: 'pending',
    description: 'Статус запроса',
  })
  @Column()
  status: FriendRequest_Status;
}
