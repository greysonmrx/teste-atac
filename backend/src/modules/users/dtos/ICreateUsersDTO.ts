import ITodo from '@modules/todos/entities/ITodo';

interface ICreateUsersDTO {
  nome: string;
  idade: number;
  email: string;
  senha: string;
  todos?: ITodo[];
}

export default ICreateUsersDTO;
