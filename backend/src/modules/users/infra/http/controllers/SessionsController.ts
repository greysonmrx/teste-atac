import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.run({ email, senha });

    return response.status(201).json({ user, token });
  }
}

export default SessionsController;
