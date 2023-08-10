import { UserRole } from 'src/core/enums';

export class AuthDataDTO {
  sub: number;
  email: string;
  role: UserRole;
}
