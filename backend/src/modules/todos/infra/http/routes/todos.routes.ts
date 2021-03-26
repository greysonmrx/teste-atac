import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TodosController from '../controllers/TodosController';

import TodoStoreValidator from '../validators/TodoStoreValidator';

const todosRouter = Router();

const todosController = new TodosController();

todosRouter.get('/', ensureAuthenticated, todosController.index);
todosRouter.post('/', ensureAuthenticated, TodoStoreValidator, todosController.store);

export default todosRouter;
