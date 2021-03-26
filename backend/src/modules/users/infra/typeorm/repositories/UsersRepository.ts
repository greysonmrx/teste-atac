import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
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
