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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(User) {
        this.User = User;
    }
    async addUser(body) {
        const email = await this.User.findOne({ email: body.email });
        if (email) {
            throw new common_1.HttpException('Email Already Exists', common_1.HttpStatus.CONFLICT);
        }
        const hash = bcrypt.hashSync(body.password, 10);
        body.password = hash;
        const newUser = new this.User(body);
        const user = await newUser.save();
        return user.toObject();
    }
    async getUserById(id) {
        const isValidId = (0, mongoose_2.isValidObjectId)(id);
        if (!isValidId)
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.UNAUTHORIZED);
        const user = await this.User.findById(id).select('-password').lean();
        if (user)
            return user;
        throw new common_1.HttpException('User Not Found', common_1.HttpStatus.UNAUTHORIZED);
    }
    async getUserByEmail(email) {
        const user = await this.User.findOne({ email: email }).lean();
        if (user)
            return user;
        throw new common_1.HttpException('User Not Found', common_1.HttpStatus.UNAUTHORIZED);
    }
    async updateRefreshToken(userId, refreshToken) {
        const hash = refreshToken ? bcrypt.hashSync(refreshToken, 10) : null;
        await this.User.findOneAndUpdate({ _id: userId }, { refreshToken: hash });
    }
    async getUsers() {
        return await this.User.find();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map