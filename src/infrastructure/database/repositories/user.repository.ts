import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/abstracts/user.repository';
import { BaseRepository } from './base.repository';
import { UserDBEntity } from '../entities/user.db-entity';
import { User } from 'src/core/entities/user.entity';
import { UserDBMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository extends BaseRepository<User, UserDBEntity> implements IUserRepository {
  constructor(@InjectRepository(UserDBEntity) private userRepository: Repository<UserDBEntity>) {
    super(userRepository, new UserDBMapper());
  }
}
