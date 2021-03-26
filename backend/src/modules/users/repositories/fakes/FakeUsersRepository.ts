import { v4 } from 'uuid';

import FakeUser from '@modules/users/entities/fakes/FakeUser';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private fakeUsers: FakeUser[] = [];

  public async findByEmail(email: string): Promise<FakeUser | undefined> {
    return this.fakeUsers.find(user => user.email === email);
  }

  public async create({ nome, idade, email, senha }: ICreateUsersDTO): Promise<FakeUser> {
    const fakeUser = new FakeUser();

    Object.assign(fakeUser, {
      id: v4(),
      nome,
      idade,
      email,
      senha,
    });

    this.fakeUsers.push(fakeUser);

    return fakeUser;
  }
}

export default FakeUsersRepository;
