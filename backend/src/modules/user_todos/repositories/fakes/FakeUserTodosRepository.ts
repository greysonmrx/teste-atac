import { v4 } from 'uuid';

import ICreateUserTodosDTO from '@modules/user_todos/dtos/ICreateUserTodosDTO';

import FakeUserTodo from '@modules/user_todos/entities/fakes/FakeUserTodo';

import IUserTodosRepository from '../IUserTodosRepository';

class FakeUserTodosRepository implements IUserTodosRepository {
  private fakeUserTodos: FakeUserTodo[] = [];

  public async findAllByUserId(user_id: string): Promise<FakeUserTodo[]> {
    return this.fakeUserTodos.filter(fakeUserTodo => fakeUserTodo.user_id === user_id);
  }

  public async create({ to_do_id, user_id }: ICreateUserTodosDTO): Promise<FakeUserTodo> {
    const fakeUserTodo = new FakeUserTodo();

    Object.assign(fakeUserTodo, {
      id: v4(),
      to_do_id,
      user_id,
    });

    this.fakeUserTodos.push(fakeUserTodo);

    return fakeUserTodo;
  }
}

export default FakeUserTodosRepository;
