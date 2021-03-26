import ITodo from '../entities/ITodo';

export type Response = Omit<ITodo, 'users'>;

export default (todo: ITodo): Response => {
  const { id, data_de_inclusao, descricao } = todo;

  return { id, data_de_inclusao, descricao };
};
