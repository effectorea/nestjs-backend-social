import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from './models/user.entity';
import {JwtGuard} from "./guards/jwt.guard";
import {JwtStrategy} from "./guards/jwt.strategy";

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => {
      return {
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '3600s'
        }
      }
    }
  }), TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, JwtGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
