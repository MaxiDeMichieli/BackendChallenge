import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  title: string;

  @IsString()
  @MaxLength(100)
  @MinLength(1)
  director: string;

  @IsString()
  @MaxLength(100)
  @MinLength(1)
  producer: string;

  @IsDateString()
  releaseDate: string;
}
