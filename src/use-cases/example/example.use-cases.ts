import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleUseCases {
  getHello(): string {
    return 'Hello World!';
  }
}
