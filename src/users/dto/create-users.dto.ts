import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
