import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const response = await authenticateUser.run({
      email: 'VitorAraujoCardoso@rhyta.com',
      senha: 'ait8aiMeecae',
    });

    expect(response).toHaveProperty('token');
    expect(response.user.id).toEqual(user.id);
  });

  it('should not be able to authenticate a non-existing user', async () => {
    await expect(
      authenticateUser.run({
        email: 'VitorAraujoCardoso@rhyta.com',
        senha: 'ait8aiMeecae',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with the wrong e-mail', async () => {
    await fakeUsersRepository.create({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    await expect(
      authenticateUser.run({
        email: 'wrong-email@user.com.br',
        senha: 'ait8aiMeecae',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with the wrong password', async () => {
    await fakeUsersRepository.create({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    await expect(
      authenticateUser.run({
        email: 'VitorAraujoCardoso@rhyta.com',
        senha: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
