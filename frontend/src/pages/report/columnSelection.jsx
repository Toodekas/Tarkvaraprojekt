import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import withRoot from '../../withRoot';

import ReportLayout from './ReportLayout';


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
});




class Graphs extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        id: '',
        users: [],
    };

    render() {
        const { classes } = this.props;

        return (
            <ReportLayout title="Aruandlus" selectedTab={1}>
                <Typography variant="h5">
                    hello advanced
                </Typography>
            </ReportLayout>
        );
    }
}

export default withRoot(withStyles(styles)(Graphs));