import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { MovieDBEntity } from '../entities/movie.db-entity';
import { Movie } from 'src/core/entities/movie.entity';
import { MovieDBMapper } from '../mappers/movie.mapper';
import { IMovieRepository } from 'src/core/abstracts/database/movie.repository';

@Injectable()
export class MovieRepository
  extends BaseRepository<Movie, MovieDBEntity>
  implements IMovieRepository
{
  constructor(@InjectRepository(MovieDBEntity) private movieRepository: Repository<MovieDBEntity>) {
    super(movieRepository, new MovieDBMapper());
  }
}
