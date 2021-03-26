import AppError from '@shared/errors/AppError';

import FakeTodosRepository from '@modules/todos/repositories/fakes/FakeTodosRepository';
import CreateTodoService from '@modules/todos/services/CreateTodoService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeTodosRepository: FakeTodosRepository;
let fakeUsersRepository: FakeUsersRepository;
let createTodo: CreateTodoService;

describe('Create Todo service', () => {
  beforeEach(() => {
    fakeTodosRepository = new FakeTodosRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createTodo = new CreateTodoService(fakeTodosRepository, fakeUsersRepository);
  });

  it('should be able to create a new todo', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const todo = await createTodo.run({ descricao: 'Comprar leite', user_id });

    expect(todo).toHaveProperty('id');
  });

  it('should not be able to create a new todo with a non-existing user', async () => {
    await expect(
      createTodo.run({
        descricao: 'Comprar leite',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
