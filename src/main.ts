import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './configuration';
import { customValidationPipe } from './presentation/controllers/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(customValidationPipe());
  await app.listen(PORT);
}

bootstrap();
