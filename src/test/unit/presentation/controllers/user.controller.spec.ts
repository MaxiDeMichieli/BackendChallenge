import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserUseCases } from 'src/use-cases/user/user.use-cases';
import { UserRegisterDTO } from 'src/core/dtos/user/user-register.dto';
import { UserLoginDTO } from 'src/core/dtos/user/user-login.dto';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UserController } from 'src/presentation/controllers/user.controller';
import { customValidationPipe } from 'src/presentation/controllers/pipes/validation.pipe';

const userUseCasesMock = {
  registerAsync: jest.fn(() => Promise.resolve({ token: 'mockedToken' })),
  loginAsync: jest.fn(() => Promise.resolve({ token: 'mockedToken' })),
};

describe('UserController', () => {
  let app: INestApplication;

  const baseUserRegisterData: UserRegisterDTO = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: 'Password123.',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserUseCases,
          useValue: userUseCasesMock,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(customValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/users/register', () => {
    it('should register a user and return a token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/register')
        .send(baseUserRegisterData)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({ token: 'mockedToken' });
      expect(userUseCasesMock.registerAsync).toHaveBeenCalledWith(baseUserRegisterData);
    });

    it('should return Bad Request with invalid body', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/register')
        .send({})
        .expect(HttpStatus.BAD_REQUEST);

      expect(Object.keys(response.body.errors)).toEqual([
        'email',
        'password',
        'firstName',
        'lastName',
      ]);
      expect(userUseCasesMock.registerAsync).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user and return a token', async () => {
      const userData: UserLoginDTO = { email: 'test@test.com', password: 'Password123.' };

      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send(userData)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({ token: 'mockedToken' });
      expect(userUseCasesMock.loginAsync).toHaveBeenCalledWith(userData);
    });
  });
});
