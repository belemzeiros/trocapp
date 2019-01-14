import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// import CardPage from '../../components/CardPage';
// import CardPage from '@/components/CardPage';
import List from '../../components/List';
import { actionGetProdutos } from '../../api/actions/produtos';
import { ProdutosPropTypes, initialState } from '../../api/reducers/produtos';

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
  componentWillMount() {
    this.props.getProdutos();
  }

  render() {
    const { classes, produtos } = this.props;

    return (
      <React.Fragment>
        <Helmet />
        <Grid container className={classes.root}>
          <Grid item xs={12} md={12} className={classes.box}>
            <div>Página Inicial Trocapp</div>
            <List produtos={produtos} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

HomePageComponent.defaultProps = {
  produtos: initialState,
};

HomePageComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    box: PropTypes.string,
    menuWrapper: PropTypes.string,
  }).isRequired,
  produtos: ProdutosPropTypes,
  getProdutos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  produtos: state.get('produtos'),
});

const mapDispatchToProps = dispatch => ({
  getProdutos: () => {
    dispatch(actionGetProdutos());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePageComponent));
