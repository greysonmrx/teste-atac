import 'reflect-metadata';
import 'dotenv/config';

import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { isCelebrateError } from 'celebrate';

import AppError from '@shared/errors/AppError';

import createConnection from '@shared/infra/typeorm';
import routes from './routes';

import '@shared/container';

class App {
  public server: Express;

  constructor() {
    createConnection();
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }

  private exceptionHandler(): void {
    this.server.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      if (isCelebrateError(err)) {
        return response.status(400).json({
          status: 'error',
          message: 'Erro de validação.',
        });
      }

      // eslint-disable-next-line no-console
      console.error(err);

      return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor.',
      });
    });
  }
}

export default new App().server;
