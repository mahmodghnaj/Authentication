import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.usersService.updateRefreshToken(userId, refreshToken);
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    const isMatch = bcrypt.compareSync(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new ForbiddenException('Access Denied');
    const rtMatch = await bcrypt.compareSync(refreshToken, user.refreshToken);
    if (!rtMatch) throw new ForbiddenException('Access Denied');
    return await this.getTokens(user);
  }
  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
    return 'ok';
  }

  async getTokens(payload) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.EXPIRATION_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.REFRESH_TOKEN_SECRET,
        expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRATION,
      }),
    ]);
    await this.updateRefreshToken(payload._id, refresh_token);
    return {
      access_token,
      refresh_token,
    };
  }
}
