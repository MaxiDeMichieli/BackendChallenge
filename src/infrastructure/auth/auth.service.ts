import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/configuration';
import { IAuthService } from 'src/core/abstracts/auth/auth.service';
import { AuthDataDTO } from 'src/core/dtos/auth/auth-data.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private jwtService: JwtService) {}

  async generateTokenAsync(payload: AuthDataDTO): Promise<string> {
    return this.jwtService.signAsync(payload, { secret: JWT_SECRET });
  }

  async validateTokenAsync(token: string): Promise<AuthDataDTO> {
    return this.jwtService
      .verifyAsync(token, { secret: JWT_SECRET })
      .then((data: AuthDataDTO) => data);
  }
}
