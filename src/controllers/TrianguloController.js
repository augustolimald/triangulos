import Triangulo from '../models/Triangulo';
import validarTriangulo from '../services/validarTriangulo';

class TrianguloController {
  verificacao(request, response) {
    const { error, value } = validarTriangulo(request.body);
    if (error) {
      return response.status(400).json({ mensagem: 'Informe valores válidos!', detalhes: error.message });
    }

    const triangulo = new Triangulo(value);
    if (!triangulo.verificacao()) {
      return response.status(400).json({ mensagem: 'Não é um triângulo válido!'});
    }

    return response.status(200).json({ mensagem: 'É um triângulo válido!'});
  }

	area(request, response) {
    const { error, value } = validarTriangulo(request.body);
    if (error) {
      return response.status(400).json({ mensagem: 'Informe valores válidos!', detalhes: error.message });
    }

    const triangulo = new Triangulo(value);
    if (!triangulo.verificacao()) {
      return response.status(400).json({ mensagem: 'Não é um triângulo válido!'});
    }

    return response.status(200).json({ area: triangulo.area() });
  }
  
  perimetro(request, response) {
    const { error, value } = validarTriangulo(request.body);
    if (error) {
      return response.status(400).json({ mensagem: 'Informe valores válidos!', detalhes: error.message });
    }

    const triangulo = new Triangulo(value);
    if (!triangulo.verificacao()) {
      return response.status(400).json({ mensagem: 'Não é um triângulo válido!'});
    }

    return response.status(200).json({ perimetro: triangulo.perimetro() });
  }

  tipo(request, response) {
    const { error, value } = validarTriangulo(request.body);
    if (error) {
      return response.status(400).json({ mensagem: 'Informe valores válidos!', detalhes: error.message });
    }

    const triangulo = new Triangulo(value);
    if (!triangulo.verificacao()) {
      return response.status(400).json({ mensagem: 'Não é um triângulo válido!'});
    }

    return response.status(200).json({ tipo: triangulo.tipo() });
  }
};

export default new TrianguloController();
