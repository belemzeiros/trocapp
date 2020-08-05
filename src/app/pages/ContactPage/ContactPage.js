import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Informação',
    label: 'Informação',
  },
  {
    value: 'Sugestão',
    label: 'Sugestão',
  },
  {
    value: 'Reclamação',
    label: 'Reclamação',
  },
  {
    value: 'Elogio',
    label: 'Elogio',
  },
];

class TextFields extends React.Component {
  state = {
    name: '',
    currency: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <grid item xs={12}>
          <h1>Fale Conosco</h1>
        </grid>
        <TextField
          id="standard-select-currency-native"
          select
          label="Selecione uma opção"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="standard-name"
          label="Nome"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Sobrenome"
          defaultValue=""
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error
          id="standard-error"
          label="Error"
          defaultValue=""
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-with-placeholder"
          label="With placeholder"
          placeholder=""
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default withStyles(styles)(TextFields);
