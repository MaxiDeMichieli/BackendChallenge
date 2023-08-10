export abstract class IEncryptService {
  abstract encryptPassword(password: string): Promise<string>;

  abstract comparePassword(password: string, encrypted: string): Promise<boolean>;
}
