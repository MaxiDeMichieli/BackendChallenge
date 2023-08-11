import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from 'src/core/abstracts/auth/auth.service';
import { IUserRepository } from 'src/core/abstracts/database/user.repository';
import { IEncryptService } from 'src/core/abstracts/encrypt/encrypt.service';
import { BadRequestException } from '@nestjs/common';
import { UserLoginDTO } from 'src/core/dtos/user/user-login.dto';
import { UserRegisterDTO } from 'src/core/dtos/user/user-register.dto';
import { UserRole } from 'src/core/enums';
import { UserUseCases } from 'src/use-cases/user/user.use-cases';

const authServiceMock = {
  generateTokenAsync: jest.fn(() => Promise.resolve('mockedToken')),
};

const userRepositoryMock = {
  getOneByEmail: jest.fn(() => undefined),
  create: jest.fn(),
};

const encryptServiceMock = {
  encryptPassword: jest.fn(() => Promise.resolve('encryptedPassword')),
  comparePassword: jest.fn(() => Promise.resolve(true)),
};

describe('UserUseCases', () => {
  let userUseCases: UserUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUseCases,
        {
          provide: IAuthService,
          useValue: authServiceMock,
        },
        {
          provide: IUserRepository,
          useValue: userRepositoryMock,
        },
        {
          provide: IEncryptService,
          useValue: encryptServiceMock,
        },
      ],
    }).compile();

    userUseCases = module.get<UserUseCases>(UserUseCases);
  });

  describe('registerAsync', () => {
    it('should register a new user and return an access token', async () => {
      const userData: UserRegisterDTO = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      userRepositoryMock.getOneByEmail.mockReturnValueOnce(undefined);
      userRepositoryMock.create.mockReturnValueOnce({ ...userData, id: 1, role: UserRole.REGULAR });

      const result = await userUseCases.registerAsync(userData);

      expect(userRepositoryMock.getOneByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepositoryMock.create).toHaveBeenCalledWith({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: UserRole.REGULAR,
        password: 'encryptedPassword',
      });
      expect(authServiceMock.generateTokenAsync).toHaveBeenCalledWith({
        email: userData.email,
        role: UserRole.REGULAR,
        sub: 1,
      });
      expect(result.accessToken).toEqual('mockedToken');
    });

    it('should throw BadRequestException if email is already registered', async () => {
      const userData: UserRegisterDTO = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      userRepositoryMock.getOneByEmail.mockReturnValueOnce({});

      await expect(userUseCases.registerAsync(userData)).rejects.toThrow(BadRequestException);
      expect(userRepositoryMock.getOneByEmail).toHaveBeenCalledWith(userData.email);
    });
  });

  describe('loginAsync', () => {
    it('should login a user and return an access token', async () => {
      const userData: UserLoginDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      userRepositoryMock.getOneByEmail.mockReturnValueOnce({
        id: 1,
        ...userData,
        role: UserRole.REGULAR,
      });
      encryptServiceMock.comparePassword.mockReturnValueOnce(Promise.resolve(true));

      const result = await userUseCases.loginAsync(userData);

      expect(result.accessToken).toEqual('mockedToken');
      expect(userRepositoryMock.getOneByEmail).toHaveBeenCalledWith(userData.email);
      expect(encryptServiceMock.comparePassword).toHaveBeenCalledWith(
        userData.password,
        userData.password,
      );
      expect(authServiceMock.generateTokenAsync).toHaveBeenCalledWith({
        email: userData.email,
        role: UserRole.REGULAR,
        sub: 1,
      });
    });

    it('should throw BadRequestException if email is not registered', async () => {
      const userData: UserLoginDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      userRepositoryMock.getOneByEmail.mockReturnValueOnce(undefined);

      await expect(userUseCases.loginAsync(userData)).rejects.toThrow(BadRequestException);
      expect(userRepositoryMock.getOneByEmail).toHaveBeenCalledWith(userData.email);
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      const userData: UserLoginDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      userRepositoryMock.getOneByEmail.mockReturnValueOnce({
        id: 1,
        ...userData,
        role: UserRole.REGULAR,
      });
      encryptServiceMock.comparePassword.mockReturnValueOnce(Promise.resolve(false));

      await expect(userUseCases.loginAsync(userData)).rejects.toThrow(BadRequestException);
      expect(userRepositoryMock.getOneByEmail).toHaveBeenCalledWith(userData.email);
      expect(encryptServiceMock.comparePassword).toHaveBeenCalledWith(
        userData.password,
        userData.password,
      );
    });
  });
});
