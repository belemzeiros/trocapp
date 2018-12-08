import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// import CardPage from '../../components/CardPage';
// import CardPage from '@/components/CardPage';
import List from '../../components/List';

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

const produtos = [
  {
    id: 1,
    title: 'Item 1',
    description: 'Descrição do Item 1',
    image: 'sofa.jpg',
  },
  {
    id: 2,
    title: 'Item 2',
    description: 'Descrição do Item 2',
    image: 'sofa.jpg',
  },
  {
    id: 3,
    title: 'Item 3',
    description: 'Descrição do Item 3',
    image: 'sofa.jpg',
  },
  {
    id: 4,
    title: 'Item 4',
    description: 'Descrição do Item 4',
    image: 'sofa.jpg',
  },
  {
    id: 5,
    title: 'Item 5',
    description: 'Descrição do Item 5',
    image: 'sofa.jpg',
  },
  {
    id: 6,
    title: 'Item 6',
    description: 'Descrição do Item 6',
    image: 'sofa.jpg',
  },
  {
    id: 7,
    title: 'Item 7',
    description: 'Descrição do Item 7',
    image: 'sofa.jpg',
  },
  {
    id: 8,
    title: 'Item 8',
    description: 'Descrição do Item 8',
    image: 'sofa.jpg',
  },
];

class HomePageComponent extends React.Component {
  render() {
    const { classes } = this.props;

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

HomePageComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    box: PropTypes.string,
    menuWrapper: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(HomePageComponent);
