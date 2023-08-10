import { Injectable, BadRequestException } from '@nestjs/common';
import { IAuthService } from 'src/core/abstracts/auth/auth.service';
import { IUserRepository } from 'src/core/abstracts/database/user.repository';
import { IEncryptService } from 'src/core/abstracts/encrypt/encrypt.service';
import {
  EMAIL_ALREADY_REGISTERED_ERROR,
  INVALID_EMAIL_PASSWORD_ERROR,
} from 'src/core/constants/errors';
import { AuthResponseDTO } from 'src/core/dtos/auth/auth-response.dto';
import { UserLoginDTO } from 'src/core/dtos/user/user-login.dto';
import { UserRegisterDTO } from 'src/core/dtos/user/user-register.dto';
import { UserRole } from 'src/core/enums';

@Injectable()
export class UserUseCases {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository,
    private encryptService: IEncryptService,
  ) {}

  async registerAsync(userData: UserRegisterDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.getOneByEmail(userData.email);
    if (user) throw new BadRequestException(EMAIL_ALREADY_REGISTERED_ERROR);

    const encryptedPassword = await this.encryptService.encryptPassword(userData.password);

    const createdUser = await this.userRepository.create({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: UserRole.REGULAR,
      password: encryptedPassword,
    });

    const accessToken = await this.authService.generateTokenAsync({
      email: createdUser.email,
      role: createdUser.role,
      sub: createdUser.id,
    });

    return { accessToken };
  }

  async loginAsync(userData: UserLoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.getOneByEmail(userData.email);
    if (!user) throw new BadRequestException(INVALID_EMAIL_PASSWORD_ERROR);

    const correctPassword = await this.encryptService.comparePassword(
      userData.password,
      user.password,
    );
    if (!correctPassword) throw new BadRequestException(INVALID_EMAIL_PASSWORD_ERROR);

    const accessToken = await this.authService.generateTokenAsync({
      email: user.email,
      role: user.role,
      sub: user.id,
    });

    return { accessToken };
  }
}
