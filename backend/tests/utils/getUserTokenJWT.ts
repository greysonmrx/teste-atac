import request from 'supertest';

import app from '../../src/shared/infra/http/app';

async function getUserTokenJWT(): Promise<string> {
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

  return response.body.token;
}

export default getUserTokenJWT;
