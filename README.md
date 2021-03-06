# TROCAPP

Uma plataforma online para trocas e doações

## Requisitos

Você precisará das seguintes coisas corretamente instaladas no seu computador.

- [Git](http://git-scm.com/) v2+
- [Node.js](http://nodejs.org/) v10.9+ (with NPM v6.4+)
- [Yarn](https://yarnpkg.com) v1.9+

## Instalação

- Clonar o repositório: `git clone git@github.com:belemzeiros/trocapp.git`
- Entrar no repositório: `cd trocapp`
- Instalar as dependências do projeto: `yarn install`

## Compilar a aplicação para produção

- `yarn build` compila a aplicação com webpack e babel, bem como executa outras tarefas de diversos plugins
- `yarn start` inicia a aplicação na porta 3001

## Iniciar a aplicação para desenvolvimento

- `yarn start:dev` builda e inicia a aplicação na porta 3000
- Para windows `rmdir ./tmp -r;mkdir ./tmp/dev-server;SET "NODE_ENV=development";SET "PATH_CONTEXT=/";node index.js`

## Testes

- `yarn test` Executa e exporta a cobertura de testes com Jest para ambiente de produção
- `yarn test:dev` Executa os testes com Jest e observa alterações para ambiente de desenvolvimento

## Boas práticas

- `yarn eslint:ci` Executa e exporta a cobertura de boas práticas com ESLint para ambiente de produção
- `yarn eslint:dev` Executa, exporta a cobertura e observa alterações com ESLint para ambiente de desenvolvimento. O ESLint tentará corrigir os erros automaticamente.

## Leitura adicional

- [Jest](https://github.com/facebook/jest) para testes unitários unit tests
- [ESLint](https://eslint.org/) para boas práticas de desenvolvimento baseado no [guia de estilo](https://github.com/airbnb/javascript) do AirBnB para JavaScript
- [ES6 Class](https://translate.google.com/translate?sl=en&tl=pt&u=https%3A//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) Classes em JavaScript
- [Flex Box](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
