import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { nome, idade, email, senha } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.run({
      nome,
      email,
      idade,
      senha,
    });

    return response.status(201).json(user);
  }
}

export default UsersController;
