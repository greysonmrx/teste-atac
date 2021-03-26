import ICreateUserTodosDTO from '@modules/user_todos/dtos/ICreateUserTodosDTO';

import IUserTodo from '../entities/IUserTodo';

interface IUserTodosRepository {
  findAllByUserId(user_id: string): Promise<IUserTodo[]>;
  create(data: ICreateUserTodosDTO): Promise<IUserTodo>;
}

export default IUserTodosRepository;
