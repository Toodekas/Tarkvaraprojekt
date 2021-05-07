import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import withRoot from '../withRoot';

import Layout from '../components/Layout';
import VictimTable from '../components/VictimTable';
import VictimTableComments from '../components/VictimTableComments'
import { letterPattern } from '../util';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  paper: {
    margin: theme.spacing.unit * 4,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  input: {
    margin: theme.spacing.unit,
    minWidth: theme.spacing.unit * 20,
  },
});

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.axios = this.props.axios;
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleDateChange = event => {
    const formValues = this.state.formValues;
    const id = event.target.id || event.target.name;
    formValues[id] = event.target.value;
    this.setState({ formValues });
    //console.log('handleChange: ', this.state);
  };

  handleChange = event => {

    const key = event.target.id;
    const value = event.target.value;

    const searchFields = this.state.searchFields;
    searchFields[key] = value;

    this.setState((state, props) =>
      Object.assign({}, state, { searchFields }),
    );
  };

  searchVictim = (searchFields) => {
    this.setState({results2: []});
    this.axios.get('get_victim.php', {
      params: searchFields,
    })
      .then(res => {
        let data = res.data;
        console.log('result: ', data);
        if (!data.length) {
          throw new Error('NO_CLIENTS_FOUND');
        }
        this.setState({ results: data });

      })
      .catch(err => {
        if (err.message === 'Request failed with status code 400') {
          this.setState({ error: 'Viga. Proovisid otsida ilma parameetriteta.' });
        } else if (err.message === 'NO_CLIENTS_FOUND') {
          this.setState({ error: 'Ühtegi sellist kasutajat ei leitud.' });
        } else if (err.message === 'Request failed with status code 401') {
          this.setState({ error: 'Autentimisviga. Proovi uuesti sisse logida.' });
        }
        setTimeout(() => this.setState({ error: '' }), 6000);
        console.log('search err: ', err);
        this.setState({ results: [] });
        this.setState({ drawerOpen: true });
      });
  };

  recentVictim = (formValues) => {
    this.setState({results: []});
    this.axios.get('get_recent_victim.php', {
      params: formValues,
    })
      .then(res => {
        let data = res.data;
        console.log('result: ', data);
        if (!data.length) {
          throw new Error('NO_CLIENTS_FOUND');
        }
        this.setState({ results2: data });

      })
      .catch(err => {
        if (err.message === 'Request failed with status code 400') {
          this.setState({ error: 'Viga!!' });
        } else if (err.message === 'NO_CLIENTS_FOUND') {
          this.setState({ error: 'Ei leidu kedagi lähiajal muudetud' });
        } else if (err.message === 'Request failed with status code 401') {
          this.setState({ error: 'Autentimisviga. Proovi uuesti sisse logida.' });
        }
        setTimeout(() => this.setState({ error: '' }), 6000);
        console.log('Recent err: ', err);
        this.setState({ results2: [] });
        this.setState({ drawerOpen: true });
      });
  };


  state = {
    searchFields: {
      first_name: '',
      id: '',
      last_name: '',
      email: '',
      national_id: '',
      phone: '',
    },
    results: [],
    results2: [],
    error: '',
    formValues: {
      alates: '2017-01-01',
      kuni: '2018-01-01',
    },
    data: {},
    checkboxValues: {},
  };

  componentDidMount() {
    //this.getReport();
    console.log(algus);
    console.log("MOUNTED");
    
    const algus = new Date();
    const lopp = new Date();

    algus.setDate(algus.getDate() - 8);
    lopp.setDate(lopp.getDate());
    let formValues = { ...this.state.formValues };
    console.log(formValues.alates);
    formValues.alates = algus.toDateInputValue();
    formValues.kuni = lopp.toDateInputValue();

    this.setState({ formValues });
  }

  handleSearch = event => {
    event.preventDefault();
    this.searchVictim(this.state.searchFields);
  };

  handleRecent = event => {
    event.preventDefault();
    console.log(this.state.formValues);
    this.recentVictim(this.state.formValues);
  }


  render() {
    const { classes } = this.props;
    const { alates, kuni } = this.state.formValues;

    const makeDateField = (id, label) => (
      <FormControl required margin="normal" className={classes.formControl}>
        <TextField
          value={this.state.formValues[id]}
          id={id}
          margin="normal"
          label={label}
          spacing={2}
          type="date"
          onChange={this.handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    );

    const field = (id, label, pattern) => (
      <TextField 
        type={id === 'email' ? 'email' : 'text'}
        id={id}
        label={label}
        className={classes.input}
        value={this.state.searchFields[id]}
        onChange={this.handleChange}
        margin="normal"
        
        inputProps={{ pattern: pattern }}
      />
    );
    const showVictims = this.state.results.length !== 0;
    const showVictims2 = this.state.results2.length !== 0;
    return (
      <Layout title="Ülevaade" error={this.state.error}>
        <Paper className={classes.paper}>

          <form onSubmit={this.handleSearch}>
            {field('id', 'ID', '\\d*')}
            {field('first_name', 'Eesnimi', letterPattern)} { /*can't use unicode groups. bug in FF, check up on https://bugzilla.mozilla.org/show_bug.cgi?id=1361876 */}
            {field('last_name', 'Perenimi', letterPattern)}
            {field('national_id', 'Isikukood', '([1-6]\\d\\d(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|30|31)\\d{4})?')}
            {field('phone', 'Telefoninumber', '([+]\\d+)?\\d*')}
            {field('email', 'E-Mail', '(.*?)')}

            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.input}
            >
              Otsi
            </Button>
          </form>
        </Paper>

        <Paper className={classes.paper}>
          <form onSubmit={this.handleRecent}>
            {makeDateField('alates', 'Alates')}
            {makeDateField('kuni', 'Kuni')}
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.input}
            >
              Hiljutine
            </Button>
          </form>
        </Paper>


        <Paper className={classes.paper}>

          <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={8}>
            <Grid item>
              {(showVictims && <VictimTable classes={classes} victims={this.state.results} />)}
              {(showVictims2 && <VictimTableComments classes={classes} victims={this.state.results2} />)}

            </Grid>
            <Grid item>
              <Link to={'victim/new/'}>
                <Button
                  variant="contained"
                  color="primary"
                >
                  Uus isik
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>


      </Layout>
    );
  }
}

export default withRoot(withStyles(styles)(Overview));
