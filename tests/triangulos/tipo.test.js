import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app';

const requisicao = supertest(app);

describe('Classificação de triângulos', async function() {
  it('Deve classificar corretamente de triângulos válidos', async function() {
    const casosValidos = [
      { lados: [ 15, 15, 18 ], tipo: 'Isósceles' },
      { lados: [ 3, 4, 5 ], tipo: 'Escaleno' },
      { lados: [ 5, 5, 5 ], tipo: 'Equilátero' },
    ];

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
    const casosInvalidos = [
      [1, 1, 2]
    ];

    return Promise.all(
      casosInvalidos.map(async lados => {
        return requisicao
          .post('/api/tipo')
          .send({ lados })
          .expect(400);    
      })
    );
  });
});
