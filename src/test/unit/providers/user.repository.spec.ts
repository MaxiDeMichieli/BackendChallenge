import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDBEntity } from 'src/providers/database/entities/user.db-entity';
import { UserRepository } from 'src/providers/database/repositories/user.repository';

class RepositoryMock {
  findOne = jest.fn();
}

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let repositoryMock: RepositoryMock;

  beforeEach(async () => {
    repositoryMock = new RepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserDBEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('getOneByEmail', () => {
    it('should return a user by email', async () => {
      const userEmail = 'test@example.com';
      const user = { id: 1, email: userEmail };
      repositoryMock.findOne.mockReturnValueOnce(user);

      const result = await userRepository.getOneByEmail(userEmail);

      expect(result).toEqual(user);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { email: userEmail } });
    });
  });
});
