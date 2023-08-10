import { Module } from '@nestjs/common';
import { ExampleUseCasesModule } from './use-cases/example/example-use-cases.module';
import { ExampleController } from './presentation/controllers/example.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './presentation/controllers/user.controller';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [ExampleUseCasesModule, UserUseCasesModule, DatabaseModule, AuthModule],
  controllers: [ExampleController, UserController],
  providers: [],
})
export class AppModule {}
