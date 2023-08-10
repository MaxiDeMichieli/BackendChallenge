import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
