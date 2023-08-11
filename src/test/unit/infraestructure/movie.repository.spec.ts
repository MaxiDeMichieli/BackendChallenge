import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieDBEntity } from 'src/infrastructure/database/entities/movie.db-entity';
import { MovieDBMapper } from 'src/infrastructure/database/mappers/movie.mapper';
import { MovieRepository } from 'src/infrastructure/database/repositories/movie.repository';

class RepositoryMock<U> {}

class MovieDBMapperMock {}

describe('MovieRepository', () => {
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRepository,
        {
          provide: getRepositoryToken(MovieDBEntity),
          useClass: RepositoryMock,
        },
        {
          provide: MovieDBMapper,
          useClass: MovieDBMapperMock,
        },
      ],
    }).compile();

    movieRepository = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(movieRepository).toBeDefined();
  });
});
