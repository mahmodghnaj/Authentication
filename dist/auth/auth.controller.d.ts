import { createUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    addUser(body: createUserDto): Promise<any>;
    logout(req: any): Promise<string>;
    refreshToken(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    me(req: any): Promise<any>;
}
