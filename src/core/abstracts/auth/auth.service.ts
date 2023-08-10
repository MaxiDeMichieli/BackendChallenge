import { AuthDataDTO } from 'src/core/dtos/auth/auth-data.dto';

export abstract class IAuthService {
  abstract generateTokenAsync(payload: AuthDataDTO): Promise<string>;

  abstract validateTokenAsync(token: string): Promise<AuthDataDTO>;
}
