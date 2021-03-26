import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

import SessionStoreValidator from '../validators/SessionStoreValidator';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/', SessionStoreValidator, sessionsController.store);

export default sessionsRouter;
