export abstract class IBaseRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract getOne(id: number | string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: number | string, item: Partial<T>): Promise<void>;

  abstract delete(id: number | string): Promise<void>;
}
