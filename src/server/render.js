import fs from 'fs';
import { resolve } from 'path';

import { render } from 'ejs';
import serialize from 'serialize-javascript';

import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { JssProvider, SheetsRegistry } from 'react-jss';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import CleanCSS from 'clean-css';

import routes from '@/routes';
import App from '@/App';

import createStore, { runAllSagas } from './createStore';

/**
 * Template compilado (client)
 */
const htmlTemplate = fs.readFileSync(
  process.env.NODE_ENV !== 'production'
    ? resolve(__dirname, 'index.ejs')
    : resolve(__dirname, 'public', 'trocapp', 'index.ejs'),
  'UTF-8'
);

/**
 * Lista de bundles para Loadable
 */
const loadableStats = JSON.parse(
  fs.readFileSync(resolve(__dirname, 'loadable.json'), 'UTF-8')
);

export default () => (req, res, next) => {
  // Quando o servidor precisa fazer requisição nele mesmo,
  // é necessário saber o endereço e o protocolo a ser utilizado.
  // Obtemos essas informações da requisição do client
  // e passamos para a função estática loadData das páginas
  const ssrHost = `${req.protocol}://${req.get('host')}`;

  // Inicia Store para redux
  const store = createStore();

  /**
   * 1- Identifica para a rota acessada
   * 2- Nessa rota, identifica quais componentes serão renderizados
   * 3- Filtra os componentes com método static loadData()
   * 4- Cria promissse para executar loadData() e montar store do Redux
   */
  matchRoutes(routes, req.path)
    .filter(({ route }) => route.page)
    .filter(({ route }) => route.page.loadData)
    .map(({ route, match }) =>
      store.dispatch(route.page.loadData({ match, ssrHost, query: req.query }))
    );

  // Executa Sagas do store
  runAllSagas(store)
    .done.then(() => {
      // Lista de módulos dinâmicos (Loadable)
      const modules = [];

      // Cria contexto para StaticRouter
      const context = {};

      // JSS + Material-ui
      const sheetsRegistry = new SheetsRegistry();
      const generateClassName = createGenerateClassName();
      const theme = createMuiTheme();

      const content = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <JssProvider
            registry={sheetsRegistry}
            generateClassName={generateClassName}
          >
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
              <Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                  <App />
                </StaticRouter>
              </Provider>
            </MuiThemeProvider>
          </JssProvider>
        </Loadable.Capture>
      );

      // Em caso de redirect, retorna corretamente
      if (context.url) {
        return res.redirect(301, context.url);
      }

      // Bundles Loadable a mandar para o client
      const loadableBundles = getBundles(loadableStats, modules);

      // Extrai styles (JSS + Material-ui)
      const jssStyles = new CleanCSS().minify(sheetsRegistry.toString()).styles;

      // Extrai Helmet do renderToString
      const helmet = Helmet.renderStatic();

      return res.status(context.status || 200).send(
        render(htmlTemplate, {
          helmet_title: helmet.title.toString(),
          helmet_meta: helmet.meta.toString(),
          helmet_link: helmet.link.toString(),
          jss_styles: `<style type="text/css" id="jss-server-side">${jssStyles}</style>`,
          loadable_preload: loadableBundles
            .map(
              bundle =>
                `<link rel="preload" href="${bundle.publicPath}" as="script">`
            )
            .join(''),
          content,
          initial_state: `<script>window.INITIAL_STATE = ${serialize(
            store.getState()
          )}</script>`,
          loadable_bundles: loadableBundles
            .map(
              bundle =>
                `<script type="text/javascript" src="${
                  bundle.publicPath
                }" defer="defer"></script>`
            )
            .join(''),
        })
      );
    })
    .catch(err => next(err));
};
