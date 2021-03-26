import IUser from '@modules/users/entities/IUser';

interface ITodo {
  id: string;
  descricao: string;
  data_de_inclusao: string;
  users: IUser[];
}

export default ITodo;
