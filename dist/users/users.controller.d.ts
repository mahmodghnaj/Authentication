import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUserById(id: string): Promise<User>;
    getUsers(): Promise<User[]>;
}
