import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app';
import casosValidos from '../data/casosValidos';
import casosInvalidos from '../data/casosInvalidos';

const requisicao = supertest(app);

describe('Classificação de triângulos', async function() {
  it('Deve classificar corretamente de triângulos válidos', async function() {
    return Promise.all(
      casosValidos.map(async caso => {
        const { body: resposta } = await requisicao
          .post('/api/tipo')
          .set('Accept','application/json')
          .send({ lados: caso.lados })
          .expect(200);
        expect(resposta).to.have.property('tipo');
        expect(resposta.tipo).to.be.a('string');
        expect(resposta.tipo).to.equal(caso.tipo);
      })
    );
  });
  
  it('Não deve classificar triângulos inválidos', async function() {
    const casos = [
      ...casosInvalidos,
      ['tres', 4, 5],
      [3, null, 5],
      [3, 4, [5]],
    ];

    return Promise.all(
      casos.map(async lados => {
        return requisicao
          .post('/api/tipo')
          .send({ lados })
          .expect(400);    
      })
    );
  });
});
