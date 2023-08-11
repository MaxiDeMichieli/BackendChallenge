import { Test, TestingModule } from '@nestjs/testing';
import { IMovieRepository } from 'src/core/abstracts/database/movie.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from 'src/core/dtos/movie/create-movie.dto';
import { UpdateMovieDTO } from 'src/core/dtos/movie/update-movie.dto';
import { MovieUseCases } from 'src/use-cases/movie/movie.use-cases';

const movieRepositoryMock = {
  getAll: jest.fn(() => []),
  getOne: jest.fn(() => undefined),
  create: jest.fn((movieData: CreateMovieDTO) => ({ id: 1, ...movieData })),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('MovieUseCases', () => {
  let movieUseCases: MovieUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieUseCases,
        {
          provide: IMovieRepository,
          useValue: movieRepositoryMock,
        },
      ],
    }).compile();

    movieUseCases = module.get<MovieUseCases>(MovieUseCases);
  });

  describe('getAllAsync', () => {
    it('should return an array of movies', async () => {
      const result = await movieUseCases.getAllAsync();

      expect(result).toEqual([]);
      expect(movieRepositoryMock.getAll).toHaveBeenCalled();
    });
  });

  describe('getByIdAsync', () => {
    it('should return a movie by id if it exists', async () => {
      const movieId = 1;
      movieRepositoryMock.getOne.mockReturnValueOnce({ id: movieId, title: 'Test Movie' });

      const result = await movieUseCases.getByIdAsync(movieId);

      expect(result).toEqual({ id: movieId, title: 'Test Movie' });
      expect(movieRepositoryMock.getOne).toHaveBeenCalledWith(movieId);
    });

    it('should throw NotFoundException if movie is not found', async () => {
      const movieId = 1;
      movieRepositoryMock.getOne.mockReturnValueOnce(undefined);

      await expect(movieUseCases.getByIdAsync(movieId)).rejects.toThrow(NotFoundException);
      expect(movieRepositoryMock.getOne).toHaveBeenCalledWith(movieId);
    });
  });

  describe('createAsync', () => {
    it('should create a new movie', async () => {
      const movieData: CreateMovieDTO = {
        title: 'title',
        director: 'director',
        producer: 'producer',
        releaseDate: '2023-01-01',
      };

      const result = await movieUseCases.createAsync(movieData);

      expect(result).toEqual({ id: 1, ...movieData });
      expect(movieRepositoryMock.create).toHaveBeenCalledWith(movieData);
    });
  });

  describe('updateAsync', () => {
    it('should update a movie', async () => {
      const movieId = 1;
      const movieData: UpdateMovieDTO = { title: 'Updated Movie' };

      await movieUseCases.updateAsync(movieId, movieData);

      expect(movieRepositoryMock.update).toHaveBeenCalledWith(movieId, movieData);
    });
  });

  describe('deleteAsync', () => {
    it('should delete a movie', async () => {
      const movieId = 1;

      await movieUseCases.deleteAsync(movieId);

      expect(movieRepositoryMock.delete).toHaveBeenCalledWith(movieId);
    });
  });
});
