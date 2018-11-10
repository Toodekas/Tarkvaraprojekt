import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';


import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import SaveIcon from '@material-ui/icons/Save'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import withRoot from '../withRoot';

import Layout from '../components/Layout';
import TextField from "@material-ui/core/TextField";


const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },

    cards: {
        margin: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: '',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
            .spacing.unit * 3}px`,
    },
    input: {
        display: 'none',
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing.unit*2,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }, 
    buttons: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginLeft: theme.spacing.unit, 
        marginBottom: theme.spacing.unit, 
    },
    button: {
        margin: theme.spacing.unit,
    },
});




class DatabaseBackup extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    downloadDatabase = () => {
        console.log("Downloading database backup")
        this.handleClose()
    }


    static propTypes = {
        classes: PropTypes.object.isRequired,
    };


    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Card className={classes.card}>
                    <CardActionArea onClick={this.handleClickOpen}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Andmebaasi varukoopia
                            </Typography>
                            <Typography component="p">
                                Andmebaasi varukoopia on suur fail, millega saab kogu 
                                andmebaasi, koos struktuuri ja terve sisuga, uuesti luua. 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <div className={classes.buttons} >
                            <Button className={classes.button} variant="outlined" onClick={this.handleClickOpen} size="small" >
                                <SaveIcon className={ classes.leftIcon }/>
                                Lae alla
                            </Button>
                            <input
                                accept="*"
                                className={classes.input}
                                id="button-file"
                                type="file"
                            />
                            <label htmlFor="button-file">
                                <Button className={classes.button} component="span" variant="outlined" size="small">
                                    <CloudUploadIcon className={ classes.leftIcon }/>
                                    Lae üles
                                </Button>
                            </label>
                            
                        </div>
                        
                    </CardActions>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>
                        Lae varukoopia alla?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            See fail on väga suur. Suurem kui 2GB. Kui sa ei tea, mida selle varukoopiaga
                            peale hakata, siis pole vaja serverit ja enda ühendust koormata.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleClose } color="primary">
                            Tagasi
                        </Button>
                        <Button onClick={ this.downloadDatabase } color="secondary">
                            Lae alla
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

class CSVBackup extends React.Component {
    state = {
        open: false,
        alates: new Date().toDateInputValue(),
        kuni: new Date().toDateInputValue(),
    };



    handleClickOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    downloadCSV = () => {
        console.log("Downloading database csv")
        this.handleClose()
    }


    static propTypes = {
        classes: PropTypes.object.isRequired,
    };


    render() {
        const { classes } = this.props;
        const { alates, kuni, open } = this.state;


        const makeDateField = (id, label) => (
            <FormControl required margin="normal" className={classes.formControl}>
                <TextField
                    value={this.state[id]}
                    id={id}
                    label={label}
                    type="date"
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
        );

        return (
            <React.Fragment>
                <Card className={classes.card}>
                    <CardActionArea onClick={this.handleClickOpen}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Põhitabeli CSV
                            </Typography>
                            <Typography component="p">
                                Põhitabeli CSV on suur fail, millega saab andmeid 
                                analüüsimiseks tuua mõnesse teise programmi.  
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <div className={classes.buttons} >
                            <Button className={classes.button} variant="outlined" onClick={this.handleClickOpen} size="small" >
                                <SaveIcon className={ classes.leftIcon }/>
                                Lae alla
                            </Button>

                            <form>
                                {makeDateField('alates', 'Alates')}
                                {makeDateField('kuni', 'Kuni')}
                            </form>

                            <input
                                accept="*"
                                className={classes.input}
                                id="button-file"
                                type="file"
                            />
                            
                        </div>
                        
                    </CardActions>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>
                        Lae CSV alla?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            See fail on väga suur. Suurem kui 2GB. Kui sa ei tea, mida selle failiga
                            peale hakata, siis pole vaja serverit ja enda ühendust koormata.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleClose } color="primary">
                            Tagasi
                        </Button>
                        <Button onClick={ this.downloadCSV } color="secondary">
                            Lae alla
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

class Backup extends React.Component {
    state = {
        id: '',
        users: [],
    };

    render() {
        const { classes } = this.props;

        return (
            <Layout title="Varundus">
                <div  className={classes.cards}>

                    <DatabaseBackup classes={classes}/>
                    <CSVBackup classes={classes}/>
                </div>
            </Layout>
        );
    }
}

export default withRoot(withStyles(styles)(Backup));
