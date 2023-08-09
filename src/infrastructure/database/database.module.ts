import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORM_CONFIG } from 'src/configuration';
import { IUserRepository } from '../../core/abstracts/user.repository';
import { UserRepository } from './repositories/user.repository';
import { UserDBEntity } from './entities/user.db-entity';

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
