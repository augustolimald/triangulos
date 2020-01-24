import supertest from 'supertest';
import app from '../../src/app';
import casosValidos from '../data/casosValidos';
import casosInvalidos from '../data/casosInvalidos';

const requisicao = supertest(app);

describe('Verificação de Triângulos', async function() {
  it('Deve aceitar triângulos válidos', async function() {
    return Promise.all(
      casosValidos.map(async caso => {
        return requisicao.post('/api/verificacao').send({ lados: caso.lados }).expect(200);    
      })
    );
  });

  it('Não deve aceitar triângulos inválidos', async function() {
    return Promise.all(
      casosInvalidos.map(async lados => {
        return requisicao.post('/api/verificacao').send({ lados }).expect(400);    
      })
    );
  });

  it('Não deve aceitar valores negativos', async function() {
    const casos = [
      [-3, 4, 5],
      [3, -4, 5],
      [3, 4, -5],
    ];

    return Promise.all(
      casos.map(async lados => {
        return requisicao.post('/api/verificacao').send({ lados }).expect(400);    
      })
    );
  });

  it ('Não deve aceitar valores não-numéricos', async function() {
    const casos = [
      [null, 4, 5],
      [3, 'quatro', 5],
      [3, 4, { num: 5}],
    ];

    return Promise.all(
      casos.map(async lados => {
        return requisicao.post('/api/verificacao').send({ lados }).expect(400);    
      })
    );
  });
});