import { Module } from '@nestjs/common';
import { ExampleUseCasesModule } from './use-cases/example/example-use-cases.module';
import { ExampleController } from './presentation/controllers/example.controller';

@Module({
  imports: [ExampleUseCasesModule],
  controllers: [ExampleController],
  providers: [],
})
export class AppModule {}
