import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { EncryptService } from 'src/providers/encrypt/encrypt.service';

jest.mock('bcrypt');

describe('EncryptService', () => {
  let encryptService: EncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    encryptService = module.get<EncryptService>(EncryptService);
  });

  describe('encryptPassword', () => {
    it('should encrypt a password', async () => {
      const password = 'testpassword';
      const hashedPassword = 'hashedPassword';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await encryptService.encryptPassword(password);

      expect(result).toBe(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 12);
    });
  });

  describe('comparePassword', () => {
    it('should compare a password and return true for matching', async () => {
      const password = 'testpassword';
      const encrypted = 'hashedPassword';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await encryptService.comparePassword(password, encrypted);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, encrypted);
    });

    it('should compare a password and return false for non-matching', async () => {
      const password = 'testpassword';
      const encrypted = 'hashedPassword';

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await encryptService.comparePassword(password, encrypted);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, encrypted);
    });
  });
});
