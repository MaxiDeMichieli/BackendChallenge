import { MovieDTO } from 'src/core/dtos/movie/movie.dto';
import { Movie } from 'src/core/entities/movie.entity';

export class MovieMapper {
  static toResponseDTO(movie: Movie): MovieDTO {
    return {
      id: movie.id,
      title: movie.title,
      director: movie.director,
      producer: movie.producer,
      releaseDate: movie.releaseDate,
    };
  }

  static toResponseListDTO(movies: Movie[]): MovieDTO[] {
    return movies.map(this.toResponseDTO);
  }
}
