"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const constants_1 = require("./constants");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async updateRefreshToken(userId, refreshToken) {
        await this.usersService.updateRefreshToken(userId, refreshToken);
    }
    async validateUser(email, pass) {
        const user = await this.usersService.getUserByEmail(email);
        const isMatch = bcrypt.compareSync(pass, user.password);
        if (user && isMatch) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async refreshToken(userId, refreshToken) {
        const user = await this.usersService.getUserById(userId);
        if (!user)
            throw new common_1.ForbiddenException('Access Denied');
        const rtMatch = await bcrypt.compareSync(refreshToken, user.refreshToken);
        if (!rtMatch)
            throw new common_1.ForbiddenException('Access Denied');
        return await this.getTokens(user);
    }
    async logout(userId) {
        await this.usersService.updateRefreshToken(userId, null);
        return 'ok';
    }
    async getTokens(payload) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: constants_1.jwtConstants.secret,
                expiresIn: constants_1.jwtConstants.EXPIRATION_TIME,
            }),
            this.jwtService.signAsync(payload, {
                secret: constants_1.jwtConstants.REFRESH_TOKEN_SECRET,
                expiresIn: constants_1.jwtConstants.REFRESH_TOKEN_EXPIRATION,
            }),
        ]);
        await this.updateRefreshToken(payload._id, refresh_token);
        return {
            access_token,
            refresh_token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map