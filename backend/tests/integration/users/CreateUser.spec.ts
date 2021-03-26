import request from 'supertest';
import { Connection, getRepository, getConnection, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;
let usersRepository: Repository<User>;

describe('Create user', () => {
  beforeAll(async () => {
    connection = await createConnection('test');
    usersRepository = getRepository(User);
  });

  afterEach(async () => {
    await connection.query('DELETE FROM "user"');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const user = await usersRepository.findOne({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toBeTruthy();

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should not be able to create two users with the same email', async () => {
    await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const response = await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const user = await usersRepository.find({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toHaveLength(1);

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('Este endereço de e-mail já está em uso.'),
      }),
    );
  });

  it('should not be able to create a new user with no name', async () => {
    const response = await request(app).post('/users').send({
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const user = await usersRepository.findOne({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toBeFalsy();

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'nome' não pode estar vazio."),
      }),
    );
  });

  it('should not be able to create a new user without e-mail', async () => {
    const response = await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const user = await usersRepository.findOne({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toBeFalsy();

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'e-mail' não pode estar vazio."),
      }),
    );
  });

  it('should not be able to create a new user with an invalid e-mail', async () => {
    const response = await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'invalid-email',
      idade: 39,
      senha: 'ait8aiMeecae',
    });

    const user = await usersRepository.findOne({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toBeFalsy();

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'e-mail' precisa conter um e-mail válido."),
      }),
    );
  });

  it('should not be able to create a new user without a password', async () => {
    const response = await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
    });

    const user = await usersRepository.findOne({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toBeFalsy();

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'senha' não pode estar vazio."),
      }),
    );
  });

  it('should not be able to create a new user without an age', async () => {
    const response = await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      senha: '12345',
    });

    const user = await usersRepository.findOne({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toBeFalsy();

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'idade' não pode estar vazio."),
      }),
    );
  });

  it('should not be able to create a new user with an invalid age', async () => {
    const response = await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 'invalid-age',
      senha: '12345',
    });

    const user = await usersRepository.findOne({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toBeFalsy();

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching("O campo 'idade' precisa ser um número."),
      }),
    );
  });

  it('should not be able to create a new user with a password of less than 6 digits', async () => {
    const response = await request(app).post('/users').send({
      nome: 'Vitor Araujo Cardoso',
      email: 'VitorAraujoCardoso@rhyta.com',
      idade: 39,
      senha: '12345',
    });

    const user = await usersRepository.findOne({
      where: { email: 'VitorAraujoCardoso@rhyta.com' },
    });

    expect(user).toBeFalsy();

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: expect.stringMatching('error'),
        message: expect.stringMatching('A senha deve conter no mínimo 6 dígitos.'),
      }),
    );
  });
});
