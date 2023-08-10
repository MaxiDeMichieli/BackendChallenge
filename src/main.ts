import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './configuration';
import { customValidationPipe } from './presentation/controllers/pipes/validation.pipe';
import { SwaggerManager } from './presentation/documentation/swagger/swagger-manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerManager.initialize(app);
  app.useGlobalPipes(customValidationPipe());
  await app.listen(PORT);
}

bootstrap();
