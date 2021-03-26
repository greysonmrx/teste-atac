import IUser from '../entities/IUser';

export default (user: IUser): Omit<IUser, 'senha'> => {
  const { id, nome, idade, email } = user;

  return { id, nome, idade, email };
};
