import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

import Todo from '@modules/todos/infra/typeorm/entities/Todo';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { id }, relations: ['todos'] });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findAllTodos(id: string): Promise<Todo[]> {
    const { todos } = await this.ormRepository.findOneOrFail(id, {
      relations: ['todos'],
    });

    return todos;
  }

  public async create({ nome, idade, email, senha }: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create({
      nome,
      idade,
      email,
      senha,
    });

    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
