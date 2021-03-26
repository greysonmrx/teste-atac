import ITodo from '@modules/todos/entities/ITodo';

import IUser from '../IUser';

class FakeUser implements IUser {
  id: string;

  nome: string;

  idade: number;

  email: string;

  senha: string;

  todos: ITodo[];
}

export default FakeUser;
