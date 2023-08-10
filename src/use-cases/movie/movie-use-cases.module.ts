import { Module } from '@nestjs/common';
import { MovieUseCases } from './movie.use-cases';
import { AuthModule } from 'src/infrastructure/auth/auth.module';
import { EncryptModule } from 'src/infrastructure/encrypt/encrypt.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

@Module({
  imports: [AuthModule, EncryptModule, DatabaseModule],
  providers: [MovieUseCases],
  exports: [MovieUseCases],
})
export class MovieUseCasesModule {}
