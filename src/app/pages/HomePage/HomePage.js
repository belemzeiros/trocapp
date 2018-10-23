import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    maxWidth: '90rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '16px',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
  box: {
    padding: '8px',
  },
  menuWrapper: {
    display: 'flex',
  },
  hidden: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

class HomePageComponent extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Helmet />
        <Grid container className={classes.root}>
          <Grid item xs={12} md={6} className={classes.box}>
            <div>Página Inicial Trocapp</div>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            className={`${classes.box} ${classes.hidden}`}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

HomePageComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    box: PropTypes.string,
    menuWrapper: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(HomePageComponent);
