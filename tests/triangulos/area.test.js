import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app';

const requisicao = supertest(app);

describe('Cálculo da área de um triângulo', async function() {
  it('Deve calcular a área corretamente de triângulos válidos', async function() {
    const casosValidos = [
      { lados: [ 15, 15, 18 ], resultado: 108 },
    ];

    return Promise.all(
      casosValidos.map(async caso => {
        const { body: resposta } = await requisicao
          .post('/api/area')
          .set('Accept','application/json')
          .send({ lados: caso.lados })
          .expect(200);
        expect(resposta).to.have.property('area');
        expect(resposta.area).to.be.a('number');
        expect(resposta.area).to.equal(parseFloat(caso.resultado.toFixed(4)));
      })
    );
  });
  
  it('Não deve cálcular a área de triângulos inválidos', async function() {
    const casosInvalidos = [
      [1, 1, 2]
    ];

    return Promise.all(
      casosInvalidos.map(async lados => {
        return requisicao
          .post('/api/area')
          .send({ lados })
          .expect(400);    
      })
    );
  });
});
