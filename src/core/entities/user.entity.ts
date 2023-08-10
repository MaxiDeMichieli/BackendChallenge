import { UserRole } from 'src/core/enums';

export class User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}
