import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserDBEntity } from './entities/user.db-entity';

export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/conexa.db',
  entities: [UserDBEntity],
  synchronize: true,
};
