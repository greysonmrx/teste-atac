import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ITodo from '../entities/ITodo';

type Request = {
  user_id: string;
};

@injectable()
class ListTodosService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({ user_id }: Request): Promise<ITodo[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    return this.usersRepository.findAllTodos(user_id);
  }
}

export default ListTodosService;
