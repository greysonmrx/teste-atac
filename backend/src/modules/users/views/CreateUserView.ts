import IUser from '../entities/IUser';

export type Response = Omit<IUser, 'senha' | 'todos'>;

export default (user: IUser): Response => {
  const { id, nome, idade, email } = user;

  return { id, nome, idade, email };
};
