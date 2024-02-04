import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'ivanov@gmail.com',
    description: 'Электронная почта',
  })
  readonly email: string;

  @ApiProperty({ example: 'deokdmelm', description: 'Пароль' })
  readonly password: string;
}
