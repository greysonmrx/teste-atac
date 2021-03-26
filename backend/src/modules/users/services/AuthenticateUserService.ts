import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

import AuthenticateUserView, { Response } from '../views/AuthenticateUserView';

type Request = {
  email: string;
  senha: string;
};

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({ email, senha }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Endereço de e-mail ou senha incorretos.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(senha, user.senha);

    if (!passwordMatched) {
      throw new AppError('Endereço de e-mail ou senha incorretos.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return AuthenticateUserView(user, token);
  }
}

export default AuthenticateUserService;
