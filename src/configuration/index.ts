import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const PORT = process.env.PORT;

export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/conexa.db',
  entities: [__dirname + '/**/*.db-entity{.ts,.js}'],
  synchronize: true,
};
