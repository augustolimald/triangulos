import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app';

const requisicao = supertest(app);

describe('Cálculo do perímetro de um triângulo', async function() {
  it('Deve calcular o perímetro corretamente de triângulos válidos', async function() {
    const casosValidos = [
      { lados: [ 15, 15, 18 ], resultado: 48 },
    ];

    return Promise.all(
      casosValidos.map(async caso => {
        const { body: resposta } = await requisicao
          .post('/api/perimetro')
          .set('Accept','application/json')
          .send({ lados: caso.lados })
          .expect(200);
        expect(resposta).to.have.property('perimetro');
        expect(resposta.perimetro).to.be.a('number');
        expect(resposta.perimetro).to.equal(parseFloat(caso.resultado.toFixed(4)));
      })
    );
  });
  
  it('Não deve cálcular o perímetro de triângulos inválidos', async function() {
    const casosInvalidos = [
      [1, 1, 2]
    ];

    return Promise.all(
      casosInvalidos.map(async lados => {
        return requisicao
          .post('/api/perimetro')
          .send({ lados })
          .expect(400);    
      })
    );
  });
});
