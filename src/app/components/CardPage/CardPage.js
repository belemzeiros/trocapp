import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 3,
  },
  card: {
    maxWidth: 345,
    margin: 15,
  },
  media: {
    height: 140,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

class CardPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: '/produto',
    };
  }

  handleClick = codProduto => {
    window.location.assign(`${this.state.produto}/${codProduto}`);
  };

  render() {
    const { classes, image, title, description, codProduto } = this.props;

    return (
      <Card className={classes.card}>
        <React.Fragment>
          <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.card}>
              <CardMedia
                className={classes.media}
                image={`/static/images/product/${image}`}
                title={title}
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  gutterBottom
                  variant="headline"
                  component="h2"
                >
                  {title}
                </Typography>
                <Typography component="p">{description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  className="cardpage-btn-eu-quero"
                  onClick={() => this.handleClick(codProduto)}
                  size="small"
                  color="primary"
                >
                  Ver detalhes
                </Button>
              </CardActions>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
              className={`${classes.card} ${classes.root}`}
            />
          </Grid>
        </React.Fragment>
      </Card>
    );
  }
}

CardPageComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  codProduto: PropTypes.number.isRequired,
};

export default withStyles(styles)(CardPageComponent);
