import ITodo from '@modules/todos/entities/ITodo';

interface IUser {
  id: string;
  nome: string;
  idade: number;
  email: string;
  senha: string;
  todos: ITodo[];
}

export default IUser;
