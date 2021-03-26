import request from 'supertest';
import { Connection, getRepository, getConnection, Repository } from 'typeorm';

import Todo from '@modules/todos/infra/typeorm/entities/Todo';
import User from '@modules/users/infra/typeorm/entities/User';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

import getUserTokenJWT from '../../utils/getUserTokenJWT';

let token: string;
let connection: Connection;
let todosRepository: Repository<Todo>;
let usersRepository: Repository<User>;

describe('List Todos', () => {
  beforeAll(async () => {
    connection = await createConnection('test');
    todosRepository = getRepository(Todo);
    usersRepository = getRepository(User);
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

  it('should be able to list all todos', async () => {
    const user = await usersRepository.findOneOrFail({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    await todosRepository.save(
      todosRepository.create({
        descricao: 'Comprar feijão',
        users: [user],
      }),
    );

    const response = await request(app).get('/todos').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should not be able to list all todos without a token', async () => {
    const response = await request(app).get(`/todos`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('Token não informado.'),
      }),
    );
  });

  it('should not be able to list all todos with a invalid token', async () => {
    const response = await request(app).get(`/todos`).set('Authorization', `Bearer invalid.token`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('Token inválido.'),
      }),
    );
  });
});
