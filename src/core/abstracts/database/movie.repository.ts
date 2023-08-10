import { Movie } from '../../entities/movie.entity';
import { IBaseRepository } from './base.repository';

export abstract class IMovieRepository extends IBaseRepository<Movie> {}
