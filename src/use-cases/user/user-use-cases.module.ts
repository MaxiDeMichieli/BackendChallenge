import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-cases';
import { AuthModule } from 'src/infrastructure/auth/auth.module';
import { EncryptModule } from 'src/infrastructure/encrypt/encrypt.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

@Module({
  imports: [AuthModule, EncryptModule, DatabaseModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
