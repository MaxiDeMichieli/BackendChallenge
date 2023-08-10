import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { IEncryptService } from 'src/core/abstracts/encrypt/encrypt.service';

@Module({
  imports: [],
  providers: [
    {
      provide: IEncryptService,
      useClass: EncryptService,
    },
  ],
  exports: [IEncryptService],
})
export class EncryptModule {}
