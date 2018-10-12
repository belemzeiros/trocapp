import React, { Component } from 'react';

class Automovel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ignicao: true,
      segredo: 'v2',
    };
  }

  if(ligaMotor) {
    this.ligarMotor(chave, segredo);
  }

  render() {
    const {
      marca, modelo, chave, ligaMotor,
    } = this.props;

    const { ignicao, segredo } = this.state;

    return (
      <div>
          <div>Marca: {marca}</div>
          <div>Modelo: {modelo}</div>
          <div>Está ligado? {ignicao ? 'sim' : 'não'}</div>
      </div>
    );
  }
}

export default Automovel;
