import { Controller, Get } from '@nestjs/common';
import { ExampleUseCases } from 'src/use-cases/example/example.use-cases';

@Controller('api/example')
export class ExampleController {
  constructor(private readonly exampleUseCases: ExampleUseCases) {}

  @Get()
  getHello(): string {
    return this.exampleUseCases.getHello();
  }
}
