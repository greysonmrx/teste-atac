import ITodo from '@modules/todos/entities/ITodo';

import IUser from '../entities/IUser';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

interface IUsersRepository {
  findById(id: string, relations?: Array<string>): Promise<IUser | undefined>;
  findByEmail(email: string, relations?: Array<string>): Promise<IUser | undefined>;
  findAllTodos(id: string): Promise<ITodo[]>;
  create(data: ICreateUsersDTO): Promise<IUser>;
}

export default IUsersRepository;
