import { Model } from 'mongoose';
import { createUserDto } from './dto/create-users.dto';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private User;
    constructor(User: Model<UserDocument>);
    addUser(body: createUserDto): Promise<any>;
    getUserById(id: any): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
    getUsers(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
