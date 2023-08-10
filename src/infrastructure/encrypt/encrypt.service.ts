import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IEncryptService } from 'src/core/abstracts/encrypt/encrypt.service';

@Injectable()
export class EncryptService implements IEncryptService {
  async encryptPassword(password: string): Promise<string> {
    const salt = 12;
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }
}
