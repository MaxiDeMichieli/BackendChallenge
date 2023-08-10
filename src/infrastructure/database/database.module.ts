import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserRepository } from '../../core/abstracts/database/user.repository';
import { UserRepository } from './repositories/user.repository';
import { UserDBEntity } from './entities/user.db-entity';
import { ORM_CONFIG } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(ORM_CONFIG), TypeOrmModule.forFeature([UserDBEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class DatabaseModule {}
