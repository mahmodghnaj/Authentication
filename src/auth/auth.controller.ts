import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/metadata';
import { createUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.getTokens(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async addUser(@Body() body: createUserDto): Promise<any> {
    const user = await this.userService.addUser(body);
    return await this.authService.getTokens(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    return await this.authService.logout(req.user._id);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(
      req.user._id,
      req.user.refreshToken,
    );
  }

  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
