import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateMovieDTO {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  director?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  producer?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: string;
}
