import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CardPage from '../components/CardPage';

const styles = () => ({
  listSection: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  listItem: {
    display: 'flex',
    flexGrow: 2,
  },
});

const List = props => {
  const { classes, produtos } = props;
  return (
    <section className={classes.listSection}>
      {produtos.map(produto => {
        const { id, title, description, image } = produto;
        return (
          <CardPage
            className={classes.listItem}
            key={`produto-${id}`}
            image={image}
            title={title}
            description={description}
          />
        );
      })}
    </section>
  );
};

List.propTypes = {
  classes: PropTypes.shape({
    listSection: PropTypes.string.isRequired,
    listItem: PropTypes.string.isRequired,
  }).isRequired,
  produtos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default withStyles(styles)(List);
