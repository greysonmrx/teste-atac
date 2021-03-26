import request from 'supertest';
import { Connection, getRepository, getConnection, Repository } from 'typeorm';

import Todo from '@modules/todos/infra/typeorm/entities/Todo';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

import getUserTokenJWT from '../../utils/getUserTokenJWT';

let token: string;
let connection: Connection;
let todosRepository: Repository<Todo>;

describe('Create Todo', () => {
  beforeAll(async () => {
    connection = await createConnection('test');
    todosRepository = getRepository(Todo);
  });

  beforeEach(async () => {
    token = await getUserTokenJWT();
  });

  afterEach(async () => {
    await connection.query('DELETE FROM to_do');
    await connection.query('DELETE FROM "user"');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({
        descricao: 'Comprar feijão',
      })
      .set('Authorization', `Bearer ${token}`);

    const todo = await todosRepository.findOne({
      where: { descricao: 'Comprar feijão' },
    });

    expect(todo).toBeTruthy();

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should not be able to create a new todo without a token', async () => {
    const response = await request(app).post(`/todos`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('Token não informado.'),
      }),
    );
  });

  it('should not be able to create a new todo with a invalid token', async () => {
    const response = await request(app).post(`/todos`).set('Authorization', `Bearer invalid.token`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('Token inválido.'),
      }),
    );
  });

  it('should not be able to create a new todo without description', async () => {
    const response = await request(app).post('/todos').send().set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'descricao' não pode estar vazio."),
      }),
    );
  });
});
