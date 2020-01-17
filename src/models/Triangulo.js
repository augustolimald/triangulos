class Triangulo {
	constructor({ lados }) {
    this.lados = lados;
  }

  verificacao() {
    if (this.lados[0] < Math.abs(this.lados[1] - this.lados[2])) {
      return false;
    } else if (this.lados[1] < Math.abs(this.lados[0] - this.lados[2])) {
      return false;
    } else if (this.lados[2] < Math.abs(this.lados[0] - this.lados[1])) {
      return false;
    } else if (this.lados[0] >= this.lados[1] + this.lados[2]) {
      return false;
    } else if (this.lados[1] >= this.lados[0] + this.lados[2]) {
      return false;
    } else if (this.lados[2] >= this.lados[0] + this.lados[1]) {
      return false;
    }

    return true;
  }

  area() {
    const p = this.lados.reduce((soma, lado) => soma + lado) / 2.0;
    return parseFloat(
      Math
        .sqrt(p * this.lados.reduce((prod, lado) => prod * (p - lado), 1))
        .toFixed(4)
    );
  }

  perimetro() {
    return parseFloat(
      this.lados.reduce((soma, lado) => soma + lado).toFixed(4)
    );
  }

  tipo() {
    const tipos = ['Equilátero', 'Isósceles', 'Escaleno'];
    const ladosDiferentes = this.lados.filter(
      (lado, indice, lados) => lados.indexOf(lado) === indice
    ).length;

    return tipos[ladosDiferentes - 1];
  }
};

export default Triangulo;
