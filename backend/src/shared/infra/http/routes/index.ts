import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import todosRoutes from '@modules/todos/infra/http/routes/todos.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/todos', todosRoutes);

export default routes;
