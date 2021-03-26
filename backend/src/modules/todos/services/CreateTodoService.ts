import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import ITodosRepository from '../repositories/ITodosRepository';

import CreateTodoView, { Response } from '../views/CreateTodoView';

type Request = {
  descricao: string;
  user_id: string;
};

@injectable()
class CreateTodoService {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({ descricao, user_id }: Request): Promise<Response> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const todo = await this.todosRepository.create({ descricao, users: [user] });

    return CreateTodoView(todo);
  }
}

export default CreateTodoService;
