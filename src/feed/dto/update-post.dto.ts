import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    example: 1,
    description: 'Уникальный номер поста',
  })
  readonly id: number;

  @ApiProperty({
    example: 'Тут могла быть ваша реклама',
    description: 'Содержание поста',
  })
  readonly body: string;
}
