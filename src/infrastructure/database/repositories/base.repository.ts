import { Repository, FindOneOptions } from 'typeorm';
import { IBaseRepository } from 'src/core/abstracts/base.repository';
import { IDBMapper } from '../mappers/mapper.interface';

interface BaseDBEntity {
  id: number | string;
}

export class BaseRepository<T, U extends BaseDBEntity> implements IBaseRepository<T> {
  constructor(private repository: Repository<U>, private mapper: IDBMapper<T, U>) {}

  async getAll(): Promise<T[]> {
    const items = await this.repository.find();
    return items.map(this.mapper.toDomain);
  }

  async getOne(id: number | string): Promise<T> {
    const item = await this.repository.findOne({
      where: { id },
    } as FindOneOptions<U>);
    return this.mapper.toDomain(item);
  }

  async create(item: T): Promise<T> {
    const itemToCreate = this.mapper.toDatabase(item);
    const createdItem = await this.repository.save(itemToCreate);
    return this.mapper.toDomain(createdItem);
  }

  async update(id: number | string, item: Partial<T>): Promise<void> {
    const itemToUpdate = this.mapper.toDatabasePartial(item);
    await this.repository.update(id, itemToUpdate);
  }

  async delete(id: number | string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
