import IUser from '../IUser';

class FakeUser implements IUser {
  id: string;

  nome: string;

  idade: number;

  email: string;

  senha: string;
}

export default FakeUser;
