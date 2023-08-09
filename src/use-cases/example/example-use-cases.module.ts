import { Module } from '@nestjs/common';
import { ExampleUseCases } from './example.use-cases';

@Module({
  imports: [],
  providers: [ExampleUseCases],
  exports: [ExampleUseCases],
})
export class ExampleUseCasesModule {}
