import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { Public } from 'src/decorators/metadata';
import { createUserDto } from './dto/create-users.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Public()
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }
  @Get()
  @Public()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }
}
