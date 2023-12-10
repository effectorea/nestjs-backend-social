import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  readonly firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  readonly lastName: string;

  @ApiProperty({
    example: 'ivanov@gmail.com',
    description: 'Электронная почта',
  })
  readonly email: string;

  @ApiProperty({ example: 'deokdmelm', description: 'Пароль' })
  readonly password: string;
}
