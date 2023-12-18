import { ApiProperty } from '@nestjs/swagger';
import {UserEntity} from "../../auth/models/user.entity";

export class CreatePostDto {
  @ApiProperty({
    example: 'Тут могла быть ваша реклама',
    description: 'Содержание поста',
  })
  readonly body: string;

  @ApiProperty({ example: 'Иванов Иван', description: 'Автор поста' })
  author?: UserEntity;
}
