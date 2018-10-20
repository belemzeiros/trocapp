import React from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';

import renderRoutes from '@/routes/render';
import routes from '@/routes';

import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  componentDidMount() {
    // Remove styles gerado pelo SSR
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Helmet defaultTitle="Trocas e Doações" titleTemplate="%s | Trocapp" />
        {renderRoutes(routes)}
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
