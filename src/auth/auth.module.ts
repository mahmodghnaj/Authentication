import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategys/local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategys/jwt-strategy';
import { JwtRefreshToken } from './strategys/jwt-refresh-strategy';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.EXPIRATION_TIME },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshToken],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
