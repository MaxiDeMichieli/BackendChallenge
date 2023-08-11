import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/core/enums';
import { AuthDataDTO } from 'src/core/dtos/auth/auth-data.dto';
import { AuthService } from 'src/providers/auth/auth.service';

const jwtServiceMock = {
  signAsync: jest.fn(() => Promise.resolve('mockedToken')),
  verifyAsync: jest.fn(() =>
    Promise.resolve({ email: 'test@test.com', role: UserRole.REGULAR, sub: 1 }),
  ),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: JwtService, useValue: jwtServiceMock }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('generateTokenAsync', () => {
    it('should generate a token', async () => {
      const payload: AuthDataDTO = { email: 'test@test.com', role: UserRole.REGULAR, sub: 1 };

      const token = await authService.generateTokenAsync(payload);

      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(payload, { secret: 'JWT_SECRET' });
      expect(token).toEqual('mockedToken');
    });
  });

  describe('validateTokenAsync', () => {
    it('should validate a token and return decoded data', async () => {
      const token = 'mockedToken';

      const decodedData = await authService.validateTokenAsync(token);

      expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith(token, { secret: 'JWT_SECRET' });
      expect(decodedData).toEqual({ email: 'test@test.com', role: UserRole.REGULAR, sub: 1 });
    });
  });
});
