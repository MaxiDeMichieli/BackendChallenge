import { User } from '../../entities/user.entity';
import { IBaseRepository } from './base.repository';

export abstract class IUserRepository extends IBaseRepository<User> {
  abstract getOneByEmail(email: string): Promise<User>;
}
