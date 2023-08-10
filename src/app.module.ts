import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './presentation/controllers/user.controller';
import { AuthModule } from './infrastructure/auth/auth.module';
import { MovieUseCasesModule } from './use-cases/movie/movie-use-cases.module';
import { MovieController } from './presentation/controllers/movie.controller';

@Module({
  imports: [UserUseCasesModule, MovieUseCasesModule, DatabaseModule, AuthModule],
  controllers: [UserController, MovieController],
  providers: [],
})
export class AppModule {}
