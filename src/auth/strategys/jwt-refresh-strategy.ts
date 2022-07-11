import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';
@Injectable()
export class JwtRefreshToken extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }
  validate(re: Request, payload: any) {
    const refreshToken = re.get('authorization').replace('Bearer', '').trim();
    payload.refreshToken = refreshToken;
    return payload;
  }
}
