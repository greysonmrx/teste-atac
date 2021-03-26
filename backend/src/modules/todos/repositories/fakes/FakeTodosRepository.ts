import { v4 } from 'uuid';

import ICreateTodosDTO from '@modules/todos/dtos/ICreateTodosDTO';

import FakeTodo from '@modules/todos/entities/fakes/FakeTodo';

import ITodosRepository from '../ITodosRepository';

class FakeTodosRepository implements ITodosRepository {
  private fakeTodos: FakeTodo[] = [];

  public async create({ descricao }: ICreateTodosDTO): Promise<FakeTodo> {
    const fakeTodo = new FakeTodo();

    Object.assign(fakeTodo, {
      id: v4(),
      descricao,
      data_de_inclusao: new Date(),
    });

    this.fakeTodos.push(fakeTodo);

    return fakeTodo;
  }
}

export default FakeTodosRepository;
