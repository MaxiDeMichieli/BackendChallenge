import { Movie } from 'src/core/entities/movie.entity';
import { IDBMapper } from './mapper.interface';
import { MovieDBEntity } from '../entities/movie.db-entity';

export class MovieDBMapper implements IDBMapper<Movie, MovieDBEntity> {
  toDomain(entity: MovieDBEntity): Movie {
    return entity
      ? {
          id: entity.id,
          director: entity.director,
          producer: entity.producer,
          releaseDate: entity.releaseDate,
          title: entity.title,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        }
      : null;
  }

  toDatabase(entity?: Movie): MovieDBEntity {
    return entity
      ? {
          id: entity.id,
          director: entity.director,
          producer: entity.producer,
          releaseDate: entity.releaseDate,
          title: entity.title,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        }
      : null;
  }

  toDatabasePartial(entity: Partial<Movie>): Partial<MovieDBEntity> {
    return entity
      ? {
          id: entity.id,
          director: entity.director,
          producer: entity.producer,
          releaseDate: entity.releaseDate,
          title: entity.title,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        }
      : null;
  }
}
