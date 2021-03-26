import IUserTodo from '../IUserTodo';

class FakeUserTodo implements IUserTodo {
  id: string;

  to_do_id: string;

  user_id: string;
}

export default FakeUserTodo;
