import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { UserDBEntity } from '../entities/user.db-entity';
import { User } from 'src/core/entities/user.entity';
import { UserDBMapper } from '../mappers/user.mapper';
import { IUserRepository } from 'src/core/abstracts/database/user.repository';

@Injectable()
export class UserRepository extends BaseRepository<User, UserDBEntity> implements IUserRepository {
  private userMapper: UserDBMapper;

  constructor(@InjectRepository(UserDBEntity) private userRepository: Repository<UserDBEntity>) {
    super(userRepository, new UserDBMapper());
    this.userMapper = new UserDBMapper();
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return this.userMapper.toDomain(user);
  }
}
