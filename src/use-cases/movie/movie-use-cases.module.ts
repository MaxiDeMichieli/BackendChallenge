import { Module } from '@nestjs/common';
import { MovieUseCases } from './movie.use-cases';
import { AuthModule } from 'src/providers/auth/auth.module';
import { EncryptModule } from 'src/providers/encrypt/encrypt.module';
import { DatabaseModule } from 'src/providers/database/database.module';

@Module({
  imports: [AuthModule, EncryptModule, DatabaseModule],
  providers: [MovieUseCases],
  exports: [MovieUseCases],
})
export class MovieUseCasesModule {}
