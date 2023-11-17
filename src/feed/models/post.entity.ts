import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
