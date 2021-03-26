import AppError from '@shared/errors/AppError';

import ListTodosService from '@modules/todos/services/ListTodosService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTodosRepository from '@modules/todos/repositories/fakes/FakeTodosRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTodosRepository: FakeTodosRepository;
let listTodos: ListTodosService;

describe('List Todos Service', () => {
  beforeEach(() => {
    fakeTodosRepository = new FakeTodosRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listTodos = new ListTodosService(fakeUsersRepository);
  });

  it('should be able to list all todos', async () => {
    const todo = await fakeTodosRepository.create({
      descricao: 'Comprar leite',
      users: [],
    });

    const { id: user_id } = await fakeUsersRepository.create({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
      todos: [todo],
    });

    const todos = await listTodos.run({ user_id });

    expect(todos).toHaveLength(1);
  });

  it('should not be able to list all todos with a non-existing user', async () => {
    await expect(
      listTodos.run({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
