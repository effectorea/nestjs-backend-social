import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { AuthService } from '../services/auth.service';
import { ReturnUserDto } from '../dto/return-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: ReturnUserDto })
  @Post('register')
  register(@Body() user: CreateUserDto): Observable<User> {
    return this.authService.registerAccount(user);
  }
}
