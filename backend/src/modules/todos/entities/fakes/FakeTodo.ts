import IUser from '@modules/users/entities/IUser';

import ITodo from '../ITodo';

class FakeTodo implements ITodo {
  id: string;

  descricao: string;

  data_de_inclusao: string;

  users: IUser[];
}

export default FakeTodo;
