import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class UserRegisterDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  lastName: string;
}
