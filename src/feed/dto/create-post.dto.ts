import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'Тут могла быть ваша реклама',
    description: 'Содержание поста',
  })
  readonly body: string;
}
