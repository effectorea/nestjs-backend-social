import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../models/role.enum';

export class ReturnUserDto {
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

  @ApiProperty({ example: '2', description: 'Идентификатор пользователя' })
  readonly id: number;

  @ApiProperty({ example: 'user', description: 'Роль' })
  readonly role: Role;
}
