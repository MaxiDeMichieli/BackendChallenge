import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateMovieDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  director?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  producer?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  releaseDate?: string;
}
