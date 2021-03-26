import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITodosRepository from '@modules/todos/repositories/ITodosRepository';
import TodosRepository from '@modules/todos/infra/typeorm/repositories/TodosRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<ITodosRepository>('TodosRepository', TodosRepository);
