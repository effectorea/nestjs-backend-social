import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'ivanov@gmail.com',
    description: 'Электронная почта',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'deokdmelm', description: 'Пароль' })
  @IsString()
  readonly password: string;
}
