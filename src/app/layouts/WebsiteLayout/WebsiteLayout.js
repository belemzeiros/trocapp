import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import Menu from '../../components/Menu';

const WebsiteLayout = ({ route, ...props }) => (
  <React.Fragment>
    <Menu title="Trocapp" />
    <route.page {...props} />
  </React.Fragment>
);

WebsiteLayout.propTypes = {
  route: PropTypes.element.isRequired,
};

export default WebsiteLayout;
