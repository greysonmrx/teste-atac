import ITodo from '../ITodo';

class FakeTodo implements ITodo {
  id: string;

  descricao: string;

  data_de_inclusao: string;
}

export default FakeTodo;
