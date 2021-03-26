import IUser from '../entities/IUser';

export type Response = {
  user: Omit<IUser, 'senha'>;
  token: string;
};

export default (user: IUser, token: string): Response => {
  const { id, nome, idade, email } = user;

  return { user: { id, nome, idade, email }, token };
};
