import ITodo from '../entities/ITodo';

import ICreateTodosDTO from '../dtos/ICreateTodosDTO';

interface ITodosRepository {
  create(data: ICreateTodosDTO): Promise<ITodo>;
}

export default ITodosRepository;
