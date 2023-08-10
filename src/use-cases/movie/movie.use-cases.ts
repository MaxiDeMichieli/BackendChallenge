import { Injectable, NotFoundException } from '@nestjs/common';
import { IMovieRepository } from 'src/core/abstracts/database/movie.repository';
import { MOVIE_NOT_FOUND_ERROR } from 'src/core/constants/errors';
import { CreateMovieDTO } from 'src/core/dtos/movie/create-movie.dto';
import { UpdateMovieDTO } from 'src/core/dtos/movie/update-movie.dto';
import { Movie } from 'src/core/entities/movie.entity';

@Injectable()
export class MovieUseCases {
  constructor(private movieRepository: IMovieRepository) {}

  async getAllAsync(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }

  async getByIdAsync(id: number): Promise<Movie> {
    const movie = await this.movieRepository.getOne(id);
    if (!movie) throw new NotFoundException(MOVIE_NOT_FOUND_ERROR);
    return movie;
  }

  async createAsync(movieToCreate: CreateMovieDTO): Promise<Movie> {
    return this.movieRepository.create(movieToCreate);
  }

  async updateAsync(id: number, movieToUpdate: UpdateMovieDTO): Promise<void> {
    return this.movieRepository.update(id, movieToUpdate);
  }

  async deleteAsync(id: number): Promise<void> {
    return this.movieRepository.delete(id);
  }
}
