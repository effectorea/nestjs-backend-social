import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.enum';
import { FeedPostEntity } from '../../feed/models/post.entity';

@Entity('user')
export class UserEntity {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'ivanov@gmail.com',
    description: 'Электронная почта',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'deokdmelm', description: 'Пароль' })
  @Column({ select: false })
  password: string;

  @ApiProperty({
    example: 'dfgt-122r-qqq5-kklg',
    description: 'Путь изображения',
  })
  @Column({ nullable: true })
  imagePath: string;

  @ApiProperty({ example: 'user', description: 'Роль' })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.author)
  feedPosts: FeedPostEntity[];
}
