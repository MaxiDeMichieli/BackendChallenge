import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMovieDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  director: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  producer: string;

  @ApiProperty()
  @IsDateString()
  releaseDate: string;
}
