import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserDBEntity } from './entities/user.db-entity';
import { MovieDBEntity } from './entities/movie.db-entity';

export const DB_ENTITIES = [UserDBEntity, MovieDBEntity];

export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/conexa.db',
  entities: DB_ENTITIES,
  synchronize: true,
};
