import React from 'react';
import PropTypes from 'prop-types';


import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import Typography from '@material-ui/core/Typography';


import withRoot from '../../withRoot';
import IncidentTable from '../../components/IncidentTable';

import Layout from '../../components/Layout';
import { navigate } from 'gatsby';
import { letterPattern } from '../../util';
import ConfirmDelete from '../../components/ConfirmDelete';
import { isAdmin } from '../../auth';

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    paper: {
        margin: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
            .spacing.unit * 3}px`,
    },
    input: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    backbutton: {
        float: 'right',
    },
    disabledPaper: {
        backgroundColor: '#e47e001c',
    },
});


class Victim extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.axios = this.props.axios
    }

    componentWillMount() {

        this.getIncidents();
        this.getVictim()

    }
    handleSelectChange = event => {
        const formValues = this.state.formValues
        formValues[event.target.name] = event.target.value
        this.setState({ formValues });
        console.log(this.state)
    };

    handleChange = event => {
        const formValues = this.state.formValues;
        let value;
        try {
            value = parseFloat(event.target.value)
        } catch (e) {
            value = event.target.value
        }
        if (isNaN(value) || value === undefined) value = event.target.value
        formValues[event.target.id] = value;
        this.setState({ formValues });
    };

    state = {
        victimArea: 'Tartumaa',
        name: 'hai',
        incidents: [{
            id: 0,
            piirkond: "teadmata"
        }],
        editingEnabled: false,
        isDeleteOpen: false,
        formValues: {
            id: this.props.victimID,
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            national_id: "",
            haridus_tase: "",
        },
    };

    getVictim = () => {
        this.axios.get('get_victim.php', {
            params: {
                id: this.props.victimID,
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                national_id: "",
                haridus_tase: "",
            },
        })
            .then(res => {
                console.log(res.data);
                let values = res.data[0]
                Object.keys(values).forEach(function (key, index) {
                    if (values[key] === null) {
                        values[key] = ""
                    }
                });



                this.setState({ formValues: values })
                console.log(this.state)

            })
            .catch(err => console.log("search err: ", err))
    };


    updateVictim = () => {
        console.log(this.state.formValues)
        this.axios.post("update_victim.php", this.state.formValues).then(res => {
            console.log("update", res)
            this.getVictim()
            this.setState({
                editingEnabled: !this.state.editingEnabled
            });
        });
    };
    handleDeleteOpen = () => {
        this.setState({ isDeleteOpen: true });
    };
    handleDeleteClose = () => {
        this.setState({ isDeleteOpen: false });
    };
    handleDeleteContinue = () => {
        this.axios.post('delete_victim.php', { id: this.props.victimID })
            .then(res => {
                console.log('delete: ', res);
                navigate('/overview');
            });
    };


    handleUpdate = event => {
        event.preventDefault()
        this.updateVictim()
    }

    getIncidents = () => {
        this.axios.get('get_incidents.php', {
            params: {
                kliendi_nr: this.props.victimID,
            }
        })
            .then(res => {
                console.log(res);
                this.setState({
                    incidents: res.data
                })
            })
            .catch(err => console.log("search err: ", err))
    };

    render() {
        const { classes } = this.props;

        return (
            <Layout title="Klient">
                <Typography variant="h4" gutterBottom>
                    Isiku profiil
                    {
                        <Button
                            className={classes.backbutton}
                            variant="contained"
                            color="primary"
                            onClick={e => navigate("/overview")}

                        >
                            TAGASI
                        </Button>

                    }
                </Typography>
                <Paper className={classNames(classes.paper, {
                    [classes.disabledPaper]: !this.state.editingEnabled,
                })}>


                    <form className={classes.form} onSubmit={this.handleUpdate}>
                        <TextField
                            fullWidth
                            id="id"
                            label="ID"
                            className={classes.input}

                            disabled
                            placeholder="1145"
                            value={this.props.victimID}
                        />
                        <TextField
                            fullWidth
                            id="first_name"
                            label="Eesnimi"
                            className={classes.input}

                            disabled={!this.state.editingEnabled}
                            // placeholder="Mari"
                            onChange={this.handleChange}
                            value={this.state.formValues.first_name}
                            inputProps={{ pattern: letterPattern }} // bug in FF: https://bugzilla.mozilla.org/show_bug.cgi?id=1361876
                        />
                        <TextField
                            id="last_name"
                            label="Perekonnanimi"
                            className={classes.input}
                            fullWidth
                            disabled={!this.state.editingEnabled}
                            // placeholder="Maasikas"
                            onChange={this.handleChange}
                            value={this.state.formValues.last_name}
                            inputProps={{ pattern: letterPattern }}  /*bug in FF: https://bugzilla.mozilla.org/show_bug.cgi?id=1361876*/

                        />
                        <TextField
                            label="Isikukood"
                            id="national_id"
                            className={classes.input}
                            disabled={!this.state.editingEnabled}
                            fullWidth
                            onChange={this.handleChange}
                            value={this.state.formValues.national_id}
                            inputProps={{ pattern: "([1-6]\\d\\d(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|30|31)\\d{4})?" }}
                        />
                        <TextField
                            id="phone"
                            label="Telefoninr"
                            className={classes.input}
                            disabled={!this.state.editingEnabled}
                            fullWidth
                            onChange={this.handleChange}
                            value={this.state.formValues.phone}
                            inputProps={{ pattern: "\\d*" }}
                        />
                        <TextField
                            label="E-maili aadress"
                            id="email"
                            type="email"
                            className={classes.input}
                            disabled={!this.state.editingEnabled}
                            fullWidth
                            onChange={this.handleChange}
                            value={this.state.formValues.email}
                        />
                        <InputLabel
                            margin="normal"
                            className={classes.input}
                            htmlFor="haridus_tase">Haridustase</InputLabel>

                        <Select
                            id='haridus_tase'
                            disabled={!this.state.editingEnabled}
                            value={this.state.formValues.haridus_tase}
                            onChange={this.handleSelectChange}
                            className={classes.input}
                            label="Haridustase"
                            inputProps={{
                                name: 'haridus_tase',
                                id: 'haridus_tase',
                            }
                            }
                            margin="normal"
                            fullWidth>
                            <MenuItem value={"Põhiharidus"}>Põhiharidus</MenuItem>
                            <MenuItem value={"Keskharidus"}>Keskharidus</MenuItem>
                            <MenuItem value={"Kutseharidus"}>Kutseharidus</MenuItem>
                            <MenuItem value={"Kõrgharidus"}>Kõrgharidus</MenuItem>
                        </Select>
                        <Grid container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={8}>
                            <Grid item>
                                {!this.state.editingEnabled ?
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={e => this.setState({
                                            editingEnabled: !this.state.editingEnabled
                                        })}
                                    >
                                        MUUDA ISIKUANDMEID
                                    </Button> : null}

                                {!this.state.editingEnabled && isAdmin() ?
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={e => {
                                            this.handleDeleteOpen();
                                        }}
                                    >
                                        KUSTUTA ISIK
                                </Button> : null}

                                {this.state.editingEnabled ?
                                    <Button
                                        className={classes.button}
                                        type="submit"
                                        variant="contained"
                                        color="primary">
                                        SALVESTA
                                    </Button> : null}

                                {this.state.editingEnabled ?
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={e => {
                                            this.getVictim()

                                            this.setState({
                                                editingEnabled: !this.state.editingEnabled
                                            });
                                        }}
                                    >
                                        TÜHISTA
                                    </Button> : null}

                            </Grid>
                        </Grid>
                    </form>

                </Paper>

                <IncidentTable classes={classes} uid={this.props.victimID} incidents={this.state.incidents} />


                <ConfirmDelete open={this.state.isDeleteOpen} object="klienti" onClose={this.handleDeleteClose}
                    onContinue={this.handleDeleteContinue} />
            </Layout>
        );
    }

}

export default withRoot(withStyles(styles)(Victim));