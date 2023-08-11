import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-cases';
import { AuthModule } from 'src/providers/auth/auth.module';
import { EncryptModule } from 'src/providers/encrypt/encrypt.module';
import { DatabaseModule } from 'src/providers/database/database.module';

@Module({
  imports: [AuthModule, EncryptModule, DatabaseModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
