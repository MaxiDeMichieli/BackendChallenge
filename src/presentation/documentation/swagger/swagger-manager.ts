import { Injectable, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Injectable()
export class SwaggerManager {
  static initialize(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Conexa Challenge Backend')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/documentation', app, document, {
      swaggerOptions: { tagsSorter: 'alpha', operationsSorter: 'alpha' },
    });
  }
}
