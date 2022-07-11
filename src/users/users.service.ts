import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { createUserDto } from './dto/create-users.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private User: Model<UserDocument>) {}
  async addUser(body: createUserDto): Promise<any> {
    const email = await this.User.findOne({ email: body.email });
    if (email) {
      throw new HttpException('Email Already Exists', HttpStatus.CONFLICT);
    }
    const hash = bcrypt.hashSync(body.password, 10);
    body.password = hash;
    const newUser = new this.User(body);
    const user = await newUser.save();
    return user.toObject();
  }

  async getUserById(id): Promise<User> {
    const isValidId = isValidObjectId(id);
    if (!isValidId)
      throw new HttpException('User Not Found', HttpStatus.UNAUTHORIZED);
    const user = await this.User.findById(id).select('-password').lean();
    if (user) return user;
    throw new HttpException('User Not Found', HttpStatus.UNAUTHORIZED);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.User.findOne({ email: email }).lean();
    if (user) return user;
    throw new HttpException('User Not Found', HttpStatus.UNAUTHORIZED);
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    const hash = refreshToken ? bcrypt.hashSync(refreshToken, 10) : null;
    await this.User.findOneAndUpdate({ _id: userId }, { refreshToken: hash });
  }
  async getUsers() {
    return await this.User.find();
  }
}
