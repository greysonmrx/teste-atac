import { v4 } from 'uuid';

import FakeUser from '@modules/users/entities/fakes/FakeUser';
import FakeTodo from '@modules/todos/entities/fakes/FakeTodo';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private fakeUsers: FakeUser[] = [];

  public async findById(id: string): Promise<FakeUser | undefined> {
    return this.fakeUsers.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<FakeUser | undefined> {
    return this.fakeUsers.find(user => user.email === email);
  }

  public async findAllTodos(id: string): Promise<FakeTodo[]> {
    const findIndex = this.fakeUsers.findIndex(findUser => findUser.id === id);

    const { todos } = this.fakeUsers[findIndex];

    return todos;
  }

  public async create({ nome, idade, email, senha, todos }: ICreateUsersDTO): Promise<FakeUser> {
    const fakeUser = new FakeUser();

    Object.assign(fakeUser, {
      id: v4(),
      nome,
      idade,
      email,
      senha,
      todos,
    });

    this.fakeUsers.push(fakeUser);

    return fakeUser;
  }
}

export default FakeUsersRepository;
