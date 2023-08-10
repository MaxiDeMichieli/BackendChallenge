import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthResponseDTO } from 'src/core/dtos/auth/auth-response.dto';
import { UserLoginDTO } from 'src/core/dtos/user/user-login.dto';
import { UserRegisterDTO } from 'src/core/dtos/user/user-register.dto';
import { UserUseCases } from 'src/use-cases/user/user.use-cases';

@Controller('api/users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Post('/register')
  @ApiBody({ type: UserRegisterDTO })
  async registerUserAsync(@Body() userData: UserRegisterDTO): Promise<AuthResponseDTO> {
    return this.userUseCases.registerAsync(userData);
  }

  @Post('/login')
  @ApiBody({ type: UserLoginDTO })
  async loginUserAsync(@Body() userData: UserLoginDTO): Promise<AuthResponseDTO> {
    return this.userUseCases.loginAsync(userData);
  }
}
