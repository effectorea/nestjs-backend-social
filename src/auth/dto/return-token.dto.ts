import {ApiProperty} from "@nestjs/swagger";

export class ReturnTokenDto {
    @ApiProperty({ example: 'dwkldjkwonoiwneuxbebycbwubx3ennu...', description: 'Токен пользователя' })
    readonly token: string;
}