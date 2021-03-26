import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTodosService from '@modules/todos/services/ListTodosService';
import CreateTodoService from '@modules/todos/services/CreateTodoService';

class TodosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listTodos = container.resolve(ListTodosService);

    const todos = await listTodos.run({ user_id });

    return response.json(todos);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { descricao } = request.body;

    const createTodo = container.resolve(CreateTodoService);

    const todo = await createTodo.run({ descricao, user_id });

    return response.status(201).json(todo);
  }
}

export default TodosController;
