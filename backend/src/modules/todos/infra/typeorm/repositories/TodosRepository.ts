import { Repository, getRepository } from 'typeorm';

import ICreateTodosDTO from '@modules/todos/dtos/ICreateTodosDTO';

import ITodosRepository from '@modules/todos/repositories/ITodosRepository';

import Todo from '../entities/Todo';

class TodosRepository implements ITodosRepository {
  private ormRepository: Repository<Todo>;

  constructor() {
    this.ormRepository = getRepository(Todo);
  }

  public async create({ descricao, users }: ICreateTodosDTO): Promise<Todo> {
    const todo = this.ormRepository.create({ descricao, users });

    return this.ormRepository.save(todo);
  }
}

export default TodosRepository;
