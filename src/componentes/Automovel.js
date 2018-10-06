class Automovel {
  constructor(modelo, segredo) {
    this.modelo = modelo;
    this.protecaoChave = segredo;
    this.ignicao = false;
  }

  verModelo() {
    return this.modelo;
  }

  ligarMotor(chave) {
    if (chave && chave.segredo === this.protecaoChave) {
      this.ignicao = true;
    }
  }

  estaLigado() {
    return this.ignicao;
  }
}

export default Automovel;
