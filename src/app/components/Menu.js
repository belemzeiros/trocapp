import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  menuLink: {
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
});

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estaAberto: null,
    };
  }

  handleClick = event => {
    this.setState({ estaAberto: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ estaAberto: null });
  };

  render() {
    const { estaAberto } = this.state;
    const { classes, title } = this.props;
    const aberto = Boolean(estaAberto);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              aria-owns={aberto ? 'fade-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <MenuList
              id="fade-menu"
              anchorEl={estaAberto}
              open={aberto}
              onClose={this.handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem className={classes.menuLink}>
                <Link to="/">Início</Link>
              </MenuItem>
              <MenuItem className={classes.menuLink}>
                <Link to="/sobre">Sobre Nós</Link>
              </MenuItem>
              <MenuItem className={classes.menuLink}>
                <Link to="/fale-conosco">Contato</Link>
              </MenuItem>
            </MenuList>
            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
              noWrap
            >
              {title}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Menu);
