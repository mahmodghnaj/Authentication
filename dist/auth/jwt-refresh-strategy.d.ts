import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
declare const JwtRefreshToken_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshToken extends JwtRefreshToken_base {
    private authService;
    constructor(authService: AuthService);
    validate(re: Request, payload: any): any;
}
export {};
