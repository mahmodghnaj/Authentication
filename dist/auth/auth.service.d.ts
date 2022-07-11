import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
    validateUser(email: string, pass: string): Promise<any>;
    refreshToken(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<string>;
    getTokens(payload: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
