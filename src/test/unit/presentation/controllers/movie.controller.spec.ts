import { Test, TestingModule } from '@nestjs/testing';
import { MovieUseCases } from 'src/use-cases/movie/movie.use-cases';
import { CreateMovieDTO } from 'src/core/dtos/movie/create-movie.dto';
import { UpdateMovieDTO } from 'src/core/dtos/movie/update-movie.dto';
import { UserRole } from 'src/core/enums';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { customValidationPipe } from 'src/presentation/controllers/pipes/validation.pipe';
import { MovieController } from 'src/presentation/controllers/movie.controller';
import { AuthModule } from 'src/infrastructure/auth/auth.module';
import { IAuthService } from 'src/core/abstracts/auth/auth.service';

const movieUseCasesMock = {
  getAllAsync: jest.fn(() => []),
  getByIdAsync: jest.fn((id: number) => ({ id, title: 'Mocked Movie' })),
  createAsync: jest.fn((movieData: CreateMovieDTO) => ({ ...movieData, id: 1 })),
  updateAsync: jest.fn(),
  deleteAsync: jest.fn(),
};

describe('MovieController', () => {
  let controller: MovieController;
  let app: INestApplication;
  let authService: IAuthService;

  const generateToken = async (role: UserRole) =>
    authService.generateTokenAsync({
      email: 'test',
      sub: 1,
      role,
    });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [MovieController],
      providers: [
        {
          provide: MovieUseCases,
          useValue: movieUseCasesMock,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    authService = module.get<IAuthService>(IAuthService);
    app = module.createNestApplication();
    app.useGlobalPipes(customValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/movies', () => {
    it('should return an array of movies', async () => {
      const response = await request(app.getHttpServer()).get('/api/movies').expect(HttpStatus.OK);

      expect(response.body).toEqual([]);
      expect(movieUseCasesMock.getAllAsync).toHaveBeenCalled();
    });
  });

  describe('GET /api/movies/:id', () => {
    it('should return a movie by id', async () => {
      const token = await generateToken(UserRole.REGULAR);

      const response = await request(app.getHttpServer())
        .get('/api/movies/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({ id: 1, title: 'Mocked Movie' });
      expect(movieUseCasesMock.getByIdAsync).toHaveBeenCalledWith(1);
    });

    it('should fail with invalid token', async () => {
      await request(app.getHttpServer())
        .get('/api/movies/1')
        .set('Authorization', 'Bearer invalid')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should fail with invalid role', async () => {
      const token = await generateToken(UserRole.ADMIN);

      await request(app.getHttpServer())
        .get('/api/movies/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('POST /api/movies', () => {
    it('should create a movie', async () => {
      const movieData: CreateMovieDTO = {
        title: 'title',
        director: 'director',
        producer: 'producer',
        releaseDate: '2023-01-01',
      };
      const token = await generateToken(UserRole.ADMIN);

      const response = await request(app.getHttpServer())
        .post('/api/movies')
        .send(movieData)
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({ id: 1, ...movieData });
      expect(movieUseCasesMock.createAsync).toHaveBeenCalledWith(movieData);
    });

    it('should fail with invalid body', async () => {
      const token = await generateToken(UserRole.ADMIN);

      const response = await request(app.getHttpServer())
        .post('/api/movies')
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST);

      expect(Object.keys(response.body.errors)).toEqual([
        'title',
        'director',
        'producer',
        'releaseDate',
      ]);
      expect(movieUseCasesMock.createAsync).not.toHaveBeenCalled();
    });

    it('should fail with invalid token', async () => {
      await request(app.getHttpServer())
        .post('/api/movies')
        .set('Authorization', 'Bearer invalid')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should fail with invalid role', async () => {
      const token = await generateToken(UserRole.REGULAR);

      await request(app.getHttpServer())
        .post('/api/movies')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('PATCH /api/movies/:id', () => {
    it('should update a movie', async () => {
      const token = await generateToken(UserRole.ADMIN);
      const movieData: UpdateMovieDTO = { title: 'Updated Movie' };

      await request(app.getHttpServer())
        .patch('/api/movies/1')
        .send(movieData)
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);

      expect(movieUseCasesMock.updateAsync).toHaveBeenCalledWith(1, movieData);
    });

    it('should fail with invalid token', async () => {
      await request(app.getHttpServer())
        .patch('/api/movies/1')
        .set('Authorization', 'Bearer invalid')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should fail with invalid role', async () => {
      const token = await generateToken(UserRole.REGULAR);

      await request(app.getHttpServer())
        .patch('/api/movies/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('DELETE /api/movies/:id', () => {
    it('should delete a movie', async () => {
      const token = await generateToken(UserRole.ADMIN);

      await request(app.getHttpServer())
        .delete('/api/movies/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);

      expect(movieUseCasesMock.deleteAsync).toHaveBeenCalledWith(1);
    });

    it('should fail with invalid token', async () => {
      await request(app.getHttpServer())
        .delete('/api/movies/1')
        .set('Authorization', 'Bearer invalid')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should fail with invalid role', async () => {
      const token = await generateToken(UserRole.REGULAR);

      await request(app.getHttpServer())
        .delete('/api/movies/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.FORBIDDEN);
    });
  });
});
