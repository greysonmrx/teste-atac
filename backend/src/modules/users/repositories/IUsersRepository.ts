import IUser from '../entities/IUser';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

interface IUsersRepository {
  findByEmail(email: string, relations?: Array<string>): Promise<IUser | undefined>;
  create(data: ICreateUsersDTO): Promise<IUser>;
}

export default IUsersRepository;
