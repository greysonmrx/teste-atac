import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

import CreateUserView from '../views/CreateUserView';

import IUser from '../entities/IUser';

type Request = {
  nome: string;
  idade: number;
  email: string;
  senha: string;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({ nome, email, idade, senha }: Request): Promise<Omit<IUser, 'senha'>> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists) {
      throw new AppError('Este endereço de e-mail já está em uso.', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(senha);

    const user = await this.usersRepository.create({
      nome,
      idade,
      email,
      senha: hashedPassword,
    });

    return CreateUserView(user);
  }
}

export default CreateUserService;
