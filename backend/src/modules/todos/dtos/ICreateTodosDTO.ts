import IUser from '@modules/users/entities/IUser';

interface ICreateTodosDTO {
  descricao: string;
  users?: IUser[];
}

export default ICreateTodosDTO;
