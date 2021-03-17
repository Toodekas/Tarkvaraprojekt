import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import SessionTable from '../../components/SessionTable';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


import withRoot from '../../withRoot';

import Layout from '../../components/Layout/index';
import { navigate } from 'gatsby';
import { isAdmin } from '../../auth';
import ConfirmDelete from '../../components/ConfirmDelete';


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
        minWidth:'600px',

    },
    input: {
        margin: theme.spacing.unit,

    },

    radiob: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        paddingRight: '3em'
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


class Incident extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.axios = this.props.axios

    }

    componentWillMount() {
        this.getSessions();
        this.getIncident()
    }

    getIncident() {
        if (this.props.location && this.props.location.state && this.props.location.state.incident) {
            const formValues = this.props.location.state["incident"];
            formValues['id'] = this.props.incidentID;
            this.setState({
                formValues: formValues,
            });
            console.log("get", this.state.formValues);
            if (!this.state.hasInit) {
                this.state.initialValue = Object.assign({}, this.state.formValues)
                this.state.hasInit = true;
            }

        } else {
            this.props.axios.get('get_incident.php', {
                params: {
                    id: this.props.incidentID,
                }
            }).then(res => {
                console.log("get_incident.php", res.data);
                this.setState({
                    formValues: res.data[0]
                })
                if (!this.state.hasInit) {
                    this.state.initialValue = Object.assign({}, this.state.formValues)
                    this.state.hasInit = true;
                }
            })
                .catch(err => console.log("search err: ", err))
        }
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


    createIncident = () => {
        this.axios.get('create_incident.php', {
            params: this.state.formValues,
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log("search err: ", err))
    };

    handleSelectChange = event => {
        const formValues = this.state.formValues;
        formValues[event.target.name] = event.target.value;
        this.setState({formValues});
        console.log(this.state)
    };
    handleChange = event => {
        const formValues = this.state.formValues;
        formValues[event.target.id] = event.target.value;
        this.setState({formValues});
        console.log(this.state)
    };
    checkboxChange = field => {
        const formValues = this.state.formValues;
        formValues[field] = (formValues[field] === 0 || formValues[field] === "") ? 1 : 0;
        this.setState({formValues});
        console.log(this.state)
    };
    radioChange = (field, value) => {
        const formValues = this.state.formValues;
        formValues[field] = value;
        this.setState({formValues});
        console.log(this.state)
    };

    state = {
        sessions: [{
            id: 0,
        }],
        hasInit: false,
        editingEnabled: false,
      isDeleteOpen: false,
        formValues: {
            id: this.props.incidentID,
            kliendi_nr: this.props.victimID,
            piirkond: "teadmata",
            keel: "teadmata",
            vanus: "teadmata",
            marac: 0,
            puue: "",
            lapsed: "0",
            rasedus: "",
            elukoht: "teadmata",
            vaimne_vagivald: 0,
            fuusiline_vagivald: 0,
            majanduslik_vagivald: 0,
            seksuaalne_vagivald: 0,
            inimkaubandus: 0,
            teadmata_vagivald: 0,
            partner_vagivallatseja: 0,
            ekspartner_vagivallatseja: 0,
            vanem_vagivallatseja: 0,
            laps_vagivallatseja: 0,
            sugulane_vagivallatseja: 0,
            tookaaslane_vagivallatseja: 0,
            muu_vagivallatseja: 0,
            vagivallatseja_vanus: "teadmata",
            vagivallatseja_sugu: "teadmata",
            laps_ohver: 0,
            vana_ohver: 0,
            muu_ohver: 0,
            politsei: "",
            rahastus: "Muu rahastus"
        },
        initialValue: {}
    };

  handleDeleteOpen = () => {
    this.setState({ isDeleteOpen: true });
  };
  handleDeleteClose = () => {
    this.setState({ isDeleteOpen: false });
  };
  handleDeleteContinue = () => {
    this.axios.post('delete_incident.php', { id: this.props.incidentID })
      .then(res => {
        console.log('delete: ', res);
        navigate('/victim/' + this.props.victimID);
      });
  };

    updateVictim = () => {
        this.axios.post("update_incident.php", this.state.formValues);
        this.props.location.state["incident"] = this.state.formValues
    };


    getSessions = () => {
        this.axios.get('get_sessions.php', {
            params: {
                incident_id: this.props.incidentID,
            }
        })
            .then(res => {
                console.log(res);
                this.setState({
                    sessions: res.data
                })
            })
            .catch(err => console.log("search err: ", err))
    };

    handleUpdate = event => {
        event.preventDefault()
        this.updateVictim();
        this.setState({
            editingEnabled: !this.state.editingEnabled,
            initialValue: Object.assign({}, this.state.formValues)
        })

    }
    render() {
        const {classes} = this.props;


        return <Layout title="Juhtum">
            <Typography variant="h4" gutterBottom>
                Juhtum
                {            <Button
                    className={classes.backbutton}
                    variant="contained"
                    color="primary"
                    onClick={e => navigate("/victim/" + this.props.victimID)}

                    >
                    TAGASI
                    </Button>}
            </Typography>

            <Paper className={classNames(classes.paper, {
                [classes.disabledPaper]: !this.state.editingEnabled,
            })}>
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing={8}
                      >
                    <Grid item>

                        <form className={classes.form} onSubmit={this.handleUpdate}>
                            <Grid container
                                  direction="row"
                                  justify="center"
                                  spacing={16}>
                                <Grid item sm={4} >
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel htmlFor="piirkond">Piirkond</InputLabel>
                                        <Select
                                            value={this.state.formValues.piirkond}
                                            onChange={this.handleSelectChange}
                                            disabled={!this.state.editingEnabled}
                                            inputProps={{
                                                name: 'piirkond',
                                                id: 'piirkond',
                                            }}>
                                            <MenuItem value={"Tartumaa"}>Tartumaa</MenuItem>
                                            <MenuItem value={"Harjumaa"}>Harjumaa</MenuItem>
                                            <MenuItem value={"Pärnumaa"}>Pärnumaa</MenuItem>
                                            <MenuItem value={"Saaremaa"}>Saaremaa</MenuItem>
                                            <MenuItem value={"Hiiumaa"}>Hiiumaa</MenuItem>
                                            <MenuItem value={"Võrumaa"}>Võrumaa</MenuItem>
                                            <MenuItem value={"Ida-Virumaa"}>Ida-Virumaa</MenuItem>
                                            <MenuItem value={"Lääne-Virumaa"}>Lääne-Virumaa</MenuItem>
                                            <MenuItem value={"Põlvamaa"}>Põlvamaa</MenuItem>
                                            <MenuItem value={"Viljandimaa"}>Viljandimaa</MenuItem>
                                            <MenuItem value={"Raplamaa"}>Raplamaa</MenuItem>
                                            <MenuItem value={"Jõgevamaa"}>Jõgevamaa</MenuItem>
                                            <MenuItem value={"Läänemaa"}>Läänemaa</MenuItem>
                                            <MenuItem value={"Järvamaa"}>Järvamaa</MenuItem>
                                            <MenuItem value={"Valgamaa"}>Valgamaa</MenuItem>
                                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>

                                        </Select>
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel htmlFor="keel">Suhtluskeel</InputLabel>
                                        <Select
                                            value={this.state.formValues.keel}
                                            onChange={this.handleSelectChange}
                                            disabled={!this.state.editingEnabled}
                                            inputProps={{
                                                name: 'keel',
                                                id: 'keel',
                                            }}>
                                            <MenuItem value={"eesti"}>Eesti</MenuItem>
                                            <MenuItem value={"vene"}>Vene</MenuItem>
                                            <MenuItem value={"inglise"}>Inglise</MenuItem>
                                            <MenuItem value={"muu"}>Muu</MenuItem>
                                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>

                                        </Select>
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel htmlFor="piirkond">Elukoht</InputLabel>
                                        <Select
                                            disabled={!this.state.editingEnabled}
                                            value={this.state.formValues.elukoht}
                                            onChange={this.handleSelectChange}
                                            inputProps={{
                                                name: 'elukoht',
                                                id: 'elukoht',
                                            }}>
                                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                                            <MenuItem value={"Tartumaa"}>Tartumaa</MenuItem>
                                            <MenuItem value={"Harjumaa"}>Harjumaa</MenuItem>
                                            <MenuItem value={"Pärnumaa"}>Pärnumaa</MenuItem>
                                            <MenuItem value={"Saaremaa"}>Saaremaa</MenuItem>
                                            <MenuItem value={"Hiiumaa"}>Hiiumaa</MenuItem>
                                            <MenuItem value={"Võrumaa"}>Võrumaa</MenuItem>
                                            <MenuItem value={"Ida-Virumaa"}>Ida-Virumaa</MenuItem>
                                            <MenuItem value={"Lääne-Virumaa"}>Lääne-Virumaa</MenuItem>
                                            <MenuItem value={"Põlvamaa"}>Põlvamaa</MenuItem>
                                            <MenuItem value={"Viljandimaa"}>Viljandimaa</MenuItem>
                                            <MenuItem value={"Raplamaa"}>Raplamaa</MenuItem>
                                            <MenuItem value={"Jõgevamaa"}>Jõgevamaa</MenuItem>
                                            <MenuItem value={"Läänemaa"}>Läänemaa</MenuItem>
                                            <MenuItem value={"Järvamaa"}>Järvamaa</MenuItem>
                                            <MenuItem value={"Valgamaa"}>Valgamaa</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel htmlFor="vanus">Vanus</InputLabel>
                                        <Select
                                            value={this.state.formValues.vanus}
                                            onChange={this.handleSelectChange}
                                            disabled={!this.state.editingEnabled}
                                            inputProps={{
                                                name: 'vanus',
                                                id: 'vanus',
                                            }}>
                                            <MenuItem value={"alla_18"}>Alla 18</MenuItem>
                                            <MenuItem value={"18-24"}>18-24</MenuItem>
                                            <MenuItem value={"25-49"}>25-49</MenuItem>
                                            <MenuItem value={"50-64"}>50-64</MenuItem>
                                            <MenuItem value={"65+"}>65+</MenuItem>
                                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <TextField
                                            disabled={!this.state.editingEnabled}
                                            label="Alaealiste laste arv"
                                            value={this.state.formValues.lapsed}
                                            onChange={this.handleChange}
                                            id = 'lapsed'
                                            inputProps={{pattern: "\\d*"}}
                                        />
                                    </FormControl>
                                    <FormControl margin="normal">
                                        <FormLabel>Puue</FormLabel>
                                        <RadioGroup className = {classes.radiob}>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.puue === 1}
                                                    onClick={() => this.radioChange("puue", 1)}/>
                                            } label="Jah"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.puue === 0}
                                                    onClick={() => this.radioChange("puue", 0)}/>
                                            } label="Ei"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl margin="normal" >
                                        <FormLabel>Rasedus</FormLabel>
                                        <RadioGroup className = {classes.radiob}>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.rasedus === 1}
                                                    onClick={() => this.radioChange("rasedus", 1)}
                                                />
                                            } label="Jah"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.rasedus === 0}
                                                    onClick={() => this.radioChange("rasedus", 0)}
                                                />
                                            } label="Ei"/>
                                        </RadioGroup>
                                    </FormControl>

                                </Grid>
                                <Grid item sm={4}>
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel>Vägivalla liik</FormLabel>
                                    <div>
                                        <FormControlLabel control={
                                            <Checkbox
                                                disabled={!this.state.editingEnabled}
                                                checked={this.state.formValues.fuusiline_vagivald === 1}
                                                onClick={() => {
                                                    this.checkboxChange("fuusiline_vagivald");
                                                    this.setState(prevState => ({
                                                        formValues: {
                                                            ...prevState.formValues,
                                                        }
                                                    }))
                                                }}
                                            />
                                        } label="Füüsiline vägivald"/>
                                        <FormControlLabel control={
                                            <Checkbox
                                                disabled={!this.state.editingEnabled}
                                                checked={this.state.formValues.vaimne_vagivald === 1}
                                                onClick={() => {
                                                    this.checkboxChange("vaimne_vagivald");
                                                    this.setState(prevState => ({
                                                        formValues: {
                                                            ...prevState.formValues,
                                                        }
                                                    }))
                                                }}
                                            />
                                        } label="Vaimne vägivald"/>
                                        <FormControlLabel control={
                                            <Checkbox
                                                disabled={!this.state.editingEnabled}
                                                checked={this.state.formValues.majanduslik_vagivald === 1}
                                                onClick={() => {
                                                    this.checkboxChange("majanduslik_vagivald");
                                                    this.setState(prevState => ({
                                                        formValues: {
                                                            ...prevState.formValues,
                                                        }
                                                    }))
                                                }}
                                            />
                                        } label="Majanduslik vägivald"/>
                                        <FormControlLabel control={
                                            <Checkbox
                                                disabled={!this.state.editingEnabled}
                                                checked={this.state.formValues.seksuaalne_vagivald === 1}
                                                onClick={() => {
                                                    this.checkboxChange("seksuaalne_vagivald");
                                                    this.setState(prevState => ({
                                                        formValues: {
                                                            ...prevState.formValues,
                                                        }
                                                    }))
                                                }}
                                            />
                                        } label="Seksuaalne vägivald"/>
                                        <FormControlLabel control={
                                            <Checkbox
                                                disabled={!this.state.editingEnabled}
                                                checked={this.state.formValues.inimkaubandus === 1}
                                                onClick={() => {
                                                    this.checkboxChange("inimkaubandus");
                                                    this.setState(prevState => ({
                                                        formValues: {
                                                            ...prevState.formValues,
                                                        }
                                                    }))
                                                }}
                                            />
                                        } label="Inimkaubandus"/>
                                        <FormControlLabel control={
                                            <Checkbox
                                                disabled={!this.state.editingEnabled}
                                                checked={this.state.formValues.teadmata_vagivald === 1}
                                                onClick={() => {
                                                    this.checkboxChange("teadmata_vagivald");
                                                    this.setState(prevState => ({
                                                        formValues: {
                                                            ...prevState.formValues,
                                                        }
                                                    }))
                                                }}
                                            />
                                        } label="Teadmata vägivald"/>
                                    </div>
                                </FormControl>

                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Vägivallatseja</FormLabel>

                                        <div>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.partner_vagivallatseja === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("partner_vagivallatseja")
                                                    }}/>
                                            } label="Partner"/>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.ekspartner_vagivallatseja === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("ekspartner_vagivallatseja")
                                                    }}/>
                                            } label="Ekspartner"/>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.vanem_vagivallatseja === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("vanem_vagivallatseja")
                                                    }}/>
                                            } label="Isa/ema"/>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.laps_vagivallatseja === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("laps_vagivallatseja")
                                                    }}/>
                                            } label="Poeg/tütar"/>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.sugulane_vagivallatseja === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("sugulane_vagivallatseja")
                                                    }}/>
                                            } label="Sugulane/hõimlane"/>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.tookaaslane_vagivallatseja === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("tookaaslane_vagivallatseja")
                                                    }}/>
                                            } label="Töö- või õpingukaaslane"/>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.muu_vagivallatseja === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("muu_vagivallatseja")
                                                    }}/>
                                            } label="Muu"/>
                                        </div>
                                    </FormControl>

                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Ohvrid lisaks naisele</FormLabel>

                                        <div>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.laps_ohver === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("laps_ohver")
                                                    }}/>
                                            } label="Alaealised lapsed"/>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.vana_ohver === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("vana_ohver")
                                                    }}/>
                                            } label="Eakad (65+)"/>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.muu_ohver === 1}
                                                    onClick={() => {
                                                        this.checkboxChange("muu_ohver")
                                                    }}/>
                                            } label="Muud"/>
                                        </div>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4}>

                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel htmlFor="vagivallatseja_vanus">Vägivallatseja vanus</InputLabel>
                                        <Select
                                            disabled={!this.state.editingEnabled}
                                            value={this.state.formValues.vagivallatseja_vanus}
                                            onChange={this.handleSelectChange}
                                            inputProps={{
                                                name: 'vagivallatseja_vanus',
                                                id: 'vagivallatseja_vanus',
                                            }}>
                                            <MenuItem value={"alla_18"}>Alla 18</MenuItem>
                                            <MenuItem value={"18-24"}>18-24</MenuItem>
                                            <MenuItem value={"25-49"}>25-49</MenuItem>
                                            <MenuItem value={"50-64"}>50-64</MenuItem>
                                            <MenuItem value={"65+"}>65+</MenuItem>
                                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Vägivallatseja sugu</FormLabel>
                                        <RadioGroup className = {classes.radiob}>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.vagivallatseja_sugu === "Mees"}
                                                    onClick={() => this.radioChange("vagivallatseja_sugu", "Mees")}
                                                />
                                            } label="Mees"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.vagivallatseja_sugu === "Naine"}
                                                    onClick={() => this.radioChange("vagivallatseja_sugu", "Naine")}
                                                />
                                            } label="Naine"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.vagivallatseja_sugu === "teadmata"}
                                                    onClick={() => this.radioChange("vagivallatseja_sugu", "teadmata")}
                                                />
                                            } label="Teadmata"/>
                                        </RadioGroup>
                                    </FormControl>




                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Kas ohver on varasemalt politseiga kontakteerunud?</FormLabel>
                                        <RadioGroup className = {classes.radiob}>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.politsei === 1}
                                                    onClick={() => this.radioChange("politsei", 1)}
                                                />
                                            } label="Jah"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.politsei === 0}
                                                    onClick={() => this.radioChange("politsei", 0)}
                                                />
                                            } label="Ei"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Suunatud MARACi</FormLabel>
                                        <RadioGroup className={classes.radiob}>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.marac === 1}
                                                    onClick={() => this.radioChange("marac", 1)}/>
                                            } label="Jah"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    disabled={!this.state.editingEnabled}
                                                    checked={this.state.formValues.marac === 0}
                                                    onClick={() => this.radioChange("marac", 0)}/>
                                            } label="Ei"/>
                                        </RadioGroup>
                                    </FormControl>        
                                    <FormControl margin="normal" fullwidth>
                                        <InputLabel htmlFor="rahastus">Rahastuse liik</InputLabel>
                                        <Select
                                            disabled={!this.state.editingEnabled}
                                            value={this.state.formValues.rahastus}
                                            onChange={this.handleSelectChange}
                                            inputProps={{
                                                name: 'rahastus',
                                                id: 'rahastus',
                                            }}>
                                            <MenuItem value={"Muu rahastus"}>Muu rahastus</MenuItem>
                                            <MenuItem value={"NTK rahastus"}>NTK rahastus</MenuItem>
                                        </Select>
                                    </FormControl>



                                </Grid>

                            </Grid>
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
                                        MUUDA JUHTUMI ANDMEID
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
                                  KUSTUTA JUHTUM
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
                                            this.setState({
                                                editingEnabled: !this.state.editingEnabled,
                                                formValues: Object.assign({}, this.state.initialValue)
                                            });


                                        }}
                                    >
                                        TÜHISTA
                                    </Button> : null}
                            </Grid>
                            </Grid>
                        </form>

                    </Grid>


                </Grid>

            </Paper>

            <SessionTable classes={classes} uid={this.props.victimID} incidentID={this.props.incidentID}
                          sessions={this.state.sessions}/>


          <ConfirmDelete open={this.state.isDeleteOpen} object="intsidenti" onClose={this.handleDeleteClose}
                         onContinue={this.handleDeleteContinue}/>
        </Layout>;
    }
}

Incident.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Incident));
