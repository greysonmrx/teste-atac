import FakeTodosRepository from '@modules/todos/repositories/fakes/FakeTodosRepository';
import CreateTodoService from '@modules/todos/services/CreateTodoService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTodosRepository from '@modules/user_todos/repositories/fakes/FakeUserTodosRepository';

let fakeTodosRepository: FakeTodosRepository;
let fakeUserTodosRepository: FakeUserTodosRepository;
let fakeUsersRepository: FakeUsersRepository;
let createTodo: CreateTodoService;

describe('Create Todo service', () => {
  beforeEach(() => {
    fakeTodosRepository = new FakeTodosRepository();
    fakeUserTodosRepository = new FakeUserTodosRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createTodo = new CreateTodoService(fakeTodosRepository, fakeUserTodosRepository);
  });

  it('should be able to create a new todo', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const todo = await createTodo.run({ descricao: 'Comprar leite', user_id });

    const userTodos = await fakeUserTodosRepository.findAllByUserId(user_id);

    expect(userTodos).toHaveLength(1);
    expect(todo).toHaveProperty('id');
  });
});
