import 'reflect-metadata';
import 'dotenv/config';

import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

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
    this.server.use((_err: Error, request: Request, response: Response, _next: NextFunction) => {
      return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor.',
      });
    });
  }
}

export default new App().server;
