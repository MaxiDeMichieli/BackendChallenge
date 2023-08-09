import { User } from 'src/core/entities/user.entity';
import { IDBMapper } from './mapper.interface';
import { UserDBEntity } from '../entities/user.db-entity';

export class UserDBMapper implements IDBMapper<User, UserDBEntity> {
  toDomain(entity: UserDBEntity): User {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDatabase(entity: User): UserDBEntity {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDatabasePartial(entity: Partial<User>): Partial<UserDBEntity> {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
