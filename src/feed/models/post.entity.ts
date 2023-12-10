import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../auth/models/user.entity';

@Entity('feed_post')
export class FeedPostEntity {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Тут могла быть ваша реклама',
    description: 'Текст поста',
  })
  @Column({ default: '' })
  body: string;

  @ApiProperty({ example: '23-12-2002', description: 'Дата создания поста' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: 'Иванов Иван', description: 'Автор поста' })
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPosts)
  author: UserEntity;
}
