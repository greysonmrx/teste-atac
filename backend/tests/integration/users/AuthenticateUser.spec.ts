import request from 'supertest';
import { Connection, getConnection } from 'typeorm';

import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('Authentication', () => {
  beforeAll(async () => {
    connection = await createConnection('test');
  });

  afterEach(async () => {
    await connection.query('DELETE FROM "user"');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to authenticate a user with valid credentials', async () => {
    await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const response = await request(app).post('/sessions').send({
      email: 'VitorAraujoCardoso@rhyta.com',
      senha: 'ait8aiMeecae',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      }),
    );
  });

  it('should not be able to authenticate a user with the wrong e-mail', async () => {
    await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const response = await request(app).post('/sessions').send({
      email: 'wrong-email@user.com.br',
      senha: 'ait8aiMeecae',
    });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('Endereço de e-mail ou senha incorretos.'),
      }),
    );
  });

  it('should not be able to authenticate a user with the wrong password', async () => {
    await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const response = await request(app).post('/sessions').send({
      email: 'VitorAraujoCardoso@rhyta.com',
      senha: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('Endereço de e-mail ou senha incorretos.'),
      }),
    );
  });

  it('should not be able to authenticate a user without e-mail', async () => {
    const response = await request(app).post('/sessions').send({
      senha: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'e-mail' não pode estar vazio."),
      }),
    );
  });

  it('should not be able to authenticate a user with an invalid e-mail', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'invalid-email',
      senha: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'e-mail' precisa conter um e-mail válido."),
      }),
    );
  });

  it('should not be able to authenticate a user without a password', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'VitorAraujoCardoso@rhyta.com',
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'senha' não pode estar vazio."),
      }),
    );
  });

  it('should not be able to authenticate a user with a password of less than 6 digits', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'VitorAraujoCardoso@rhyta.com',
      senha: '12345',
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('A senha deve conter no mínimo 6 dígitos.'),
      }),
    );
  });
});
