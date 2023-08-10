import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserRepository } from '../../core/abstracts/database/user.repository';
import { UserRepository } from './repositories/user.repository';
import { DB_ENTITIES, ORM_CONFIG } from './config';
import { IMovieRepository } from 'src/core/abstracts/database/movie.repository';
import { MovieRepository } from './repositories/movie.repository';

@Module({
  imports: [TypeOrmModule.forRoot(ORM_CONFIG), TypeOrmModule.forFeature(DB_ENTITIES)],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IMovieRepository,
      useClass: MovieRepository,
    },
  ],
  exports: [IUserRepository, IMovieRepository],
})
export class DatabaseModule {}
