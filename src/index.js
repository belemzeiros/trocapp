import React, { Component } from 'react';
import { render } from 'react-dom';
import Automovel from './Automovel';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    const chave = {segredo: 'v2'};
    return (
     <Automovel marca="Fiat" modelo="Uno" chave={chave} />
    );
  }
}

render(<App />, document.getElementById('root'));
