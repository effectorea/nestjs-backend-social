import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import {map, Observable} from 'rxjs';
import { User } from '../models/user.interface';
import { AuthService } from '../services/auth.service';
import { ReturnUserDto } from '../dto/return-user.dto';
import {LoginUserDto} from "../dto/login-user.dto";
import {ReturnTokenDto} from "../dto/return-token.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: ReturnUserDto })
  @Post('register')
  register(@Body() user: CreateUserDto): Observable<User> {
    return this.authService.registerAccount(user);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: ReturnTokenDto })
  @Post('login')
  login(@Body() user: LoginUserDto): Observable<{token: string}> {
    return this.authService.login(user).pipe(
        map((jwt: string) => ({token: jwt}))
    )
  }
}
