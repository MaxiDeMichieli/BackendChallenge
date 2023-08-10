import { User } from 'src/core/entities/user.entity';
import { IDBMapper } from './mapper.interface';
import { UserDBEntity } from '../entities/user.db-entity';

export class UserDBMapper implements IDBMapper<User, UserDBEntity> {
  toDomain(entity: UserDBEntity): User {
    return entity
      ? {
          id: entity.id,
          firstName: entity.firstName,
          lastName: entity.lastName,
          email: entity.email,
          role: entity.role,
          password: entity.password,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        }
      : null;
  }

  toDatabase(entity: User): UserDBEntity {
    return entity
      ? {
          id: entity.id,
          firstName: entity.firstName,
          lastName: entity.lastName,
          email: entity.email,
          role: entity.role,
          password: entity.password,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        }
      : null;
  }

  toDatabasePartial(entity: Partial<User>): Partial<UserDBEntity> {
    return entity
      ? {
          id: entity.id,
          firstName: entity.firstName,
          lastName: entity.lastName,
          email: entity.email,
          role: entity.role,
          password: entity.password,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        }
      : null;
  }
}
