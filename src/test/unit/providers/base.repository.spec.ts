import { BaseRepository } from 'src/providers/database/repositories/base.repository';
import { Repository } from 'typeorm';

class RepositoryMock {
  find = jest.fn();
  findOne = jest.fn();
  save = jest.fn();
  update = jest.fn();
  softDelete = jest.fn();
}

class DBMapperMock {
  toDomain = jest.fn();
  toDatabase = jest.fn();
  toDatabasePartial = jest.fn();
}

describe('BaseRepository', () => {
  let baseRepository: BaseRepository<unknown, { id: number }>;
  let repositoryMock: RepositoryMock;
  let mapperMock: DBMapperMock;

  beforeAll(async () => {
    repositoryMock = new RepositoryMock();
    mapperMock = new DBMapperMock();
    baseRepository = new BaseRepository(
      repositoryMock as unknown as Repository<unknown>,
      mapperMock,
    );
  });

  describe('getAll', () => {
    it('should return an array of items', async () => {
      repositoryMock.find.mockReturnValueOnce([{ id: 1 }, { id: 2 }]);
      mapperMock.toDomain.mockImplementation((item) => item);

      const result = await baseRepository.getAll();

      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
      expect(repositoryMock.find).toHaveBeenCalled();
      expect(mapperMock.toDomain).toHaveBeenCalledTimes(2);
    });
  });

  describe('getOne', () => {
    it('should return an item by id', async () => {
      repositoryMock.findOne.mockReturnValueOnce({ id: 1 });
      mapperMock.toDomain.mockReturnValueOnce({ id: 1 });

      const result = await baseRepository.getOne(1);

      expect(result).toEqual({ id: 1 });
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mapperMock.toDomain).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create an item and return the created item', async () => {
      const item = { id: 1, name: 'Test Item' };
      repositoryMock.save.mockReturnValueOnce(item);
      mapperMock.toDatabase.mockReturnValueOnce(item);
      mapperMock.toDomain.mockReturnValueOnce(item);

      const result = await baseRepository.create(item);

      expect(result).toEqual(item);
      expect(repositoryMock.save).toHaveBeenCalledWith(item);
      expect(mapperMock.toDatabase).toHaveBeenCalledWith(item);
      expect(mapperMock.toDomain).toHaveBeenCalledWith(item);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const itemId = 1;
      const itemToUpdate = { name: 'Updated Item' };
      mapperMock.toDatabasePartial.mockReturnValueOnce(itemToUpdate);

      await baseRepository.update(itemId, itemToUpdate);

      expect(repositoryMock.update).toHaveBeenCalledWith(itemId, itemToUpdate);
      expect(mapperMock.toDatabasePartial).toHaveBeenCalledWith(itemToUpdate);
    });
  });

  describe('delete', () => {
    it('should soft delete an item', async () => {
      const itemId = 1;

      await baseRepository.delete(itemId);

      expect(repositoryMock.softDelete).toHaveBeenCalledWith(itemId);
    });
  });
});
