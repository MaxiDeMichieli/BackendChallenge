import { Module } from '@nestjs/common';
import { ExampleUseCasesModule } from './use-cases/example/example-use-cases.module';
import { ExampleController } from './presentation/controllers/example.controller';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [ExampleUseCasesModule, DatabaseModule],
  controllers: [ExampleController],
  providers: [],
})
export class AppModule {}
