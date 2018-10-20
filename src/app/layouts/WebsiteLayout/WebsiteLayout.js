import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const WebsiteLayout = ({ route, ...props }) => (
  <React.Fragment>
    <route.page {...props} />
  </React.Fragment>
);

WebsiteLayout.propTypes = {
  route: PropTypes.element.isRequired,
};

export default WebsiteLayout;
