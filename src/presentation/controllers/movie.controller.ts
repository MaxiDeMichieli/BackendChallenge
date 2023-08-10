import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDTO } from 'src/core/dtos/movie/create-movie.dto';
import { UpdateMovieDTO } from 'src/core/dtos/movie/update-movie.dto';
import { MovieUseCases } from 'src/use-cases/movie/movie.use-cases';
import { MovieMapper } from './mappers/movie.mapper';
import { MovieDTO } from 'src/core/dtos/movie/movie.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UserRole } from 'src/core/enums';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('api/movies')
@ApiTags('Movies')
export class MovieController {
  constructor(private readonly movieUseCases: MovieUseCases) {}

  @Get()
  async getAllAsync(): Promise<MovieDTO[]> {
    const movies = await this.movieUseCases.getAllAsync();
    return MovieMapper.toResponseListDTO(movies);
  }

  @Get('/:id')
  @UseGuards(AuthGuard, RolesGuard([UserRole.REGULAR]))
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, type: Number })
  async getByIdAsync(@Param('id', ParseIntPipe) id: number): Promise<MovieDTO> {
    const movie = await this.movieUseCases.getByIdAsync(id);
    return MovieMapper.toResponseDTO(movie);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard([UserRole.ADMIN]))
  @ApiBearerAuth()
  @ApiBody({ type: CreateMovieDTO })
  async createAsync(@Body() movieData: CreateMovieDTO): Promise<MovieDTO> {
    const createdMovie = await this.movieUseCases.createAsync(movieData);
    return MovieMapper.toResponseDTO(createdMovie);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard, RolesGuard([UserRole.ADMIN]))
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBody({ type: UpdateMovieDTO })
  async updateAsync(
    @Param('id', ParseIntPipe) id: number,
    @Body() movieData: UpdateMovieDTO,
  ): Promise<void> {
    return this.movieUseCases.updateAsync(id, movieData);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, RolesGuard([UserRole.ADMIN]))
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, type: Number })
  async deleteByIdAsync(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.movieUseCases.deleteAsync(id);
  }
}
