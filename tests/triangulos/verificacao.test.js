import supertest from 'supertest';
import app from '../../src/app';

const requisicao = supertest(app);

describe('Verificação de Triângulos', async function() {
  it('Deve aceitar triângulos válidos', async function() {
    const casosValidos = [
      [3, 4, 5]
    ];

    return Promise.all(
      casosValidos.map(async lados => {
        return requisicao.post('/api/verificacao').send({ lados }).expect(200);    
      })
    );
  });

  it('Não deve aceitar triângulos inválidos', async function() {
    const casosInvalidos = [
      [1, 1, 2]
    ];

    return Promise.all(
      casosInvalidos.map(async lados => {
        return requisicao.post('/api/verificacao').send({ lados }).expect(400);    
      })
    );
  });

  it('Não deve aceitar valores negativos', async function() {
    const casosInvalidos = [
      [null, 'a', 1]
    ];

    return Promise.all(
      casosInvalidos.map(async lados => {
        return requisicao.post('/api/verificacao').send({ lados }).expect(400);    
      })
    );
  });

  it ('Não deve aceitar valores não-numéricos', async function() {
    const casosInvalidos = [
      [null, 'a', 1]
    ];

    return Promise.all(
      casosInvalidos.map(async lados => {
        return requisicao.post('/api/verificacao').send({ lados }).expect(400);    
      })
    );
  });
});