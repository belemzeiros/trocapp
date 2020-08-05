import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const ErrorPage = ({ staticContext }) => {
  staticContext.status = 404;

  return (
    <React.Fragment>
      <Helmet>
        <title>Erro página não encontrada</title>
      </Helmet>
      <div>Página não existe!</div>
    </React.Fragment>
  );
};

ErrorPage.defaultProps = {
  staticContext: {},
};

ErrorPage.propTypes = {
  staticContext: PropTypes.shape({}),
};

export default ErrorPage;
