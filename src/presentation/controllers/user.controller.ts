import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDTO } from 'src/core/dtos/auth/auth-response.dto';
import { UserLoginDTO } from 'src/core/dtos/user/user-login.dto';
import { UserRegisterDTO } from 'src/core/dtos/user/user-register.dto';
import { UserUseCases } from 'src/use-cases/user/user.use-cases';

@Controller('api/users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Post('/register')
  async registerUserAsync(@Body() userData: UserRegisterDTO): Promise<AuthResponseDTO> {
    return this.userUseCases.registerAsync(userData);
  }

  @Post('/login')
  async loginUserAsync(@Body() userData: UserLoginDTO): Promise<AuthResponseDTO> {
    return this.userUseCases.loginAsync(userData);
  }
}
