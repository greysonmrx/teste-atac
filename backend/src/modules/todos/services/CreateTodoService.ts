import { inject, injectable } from 'tsyringe';

import IUserTodosRepository from '@modules/user_todos/repositories/IUserTodosRepository';

import ITodosRepository from '../repositories/ITodosRepository';

import ITodo from '../entities/ITodo';

type Request = {
  descricao: string;
  user_id: string;
};

@injectable()
class CreateTodoService {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,

    @inject('UserTodosRepository')
    private userTodosRepository: IUserTodosRepository,
  ) {}

  public async run({ descricao, user_id }: Request): Promise<ITodo> {
    const todo = await this.todosRepository.create({ descricao });

    await this.userTodosRepository.create({ to_do_id: todo.id, user_id });

    return todo;
  }
}

export default CreateTodoService;
