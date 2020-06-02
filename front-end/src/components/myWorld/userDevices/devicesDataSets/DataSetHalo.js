import React, { Component } from 'react';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// mui stuff
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    table: {
        minWidth: 650,
    }
});

class DataSetHalo extends Component {
    
    render() {
        dayjs.extend(relativeTime);

        const {
            classes, 
            dataset:{
                createdAt,
                midi:{
                    color,
                    lights,
                    mic,
                    speakers,
                    vibration
                },
                tail:{
                    motion,
                    pressure,
                    proximity,
                    temperature,
                    position:{
                        x,y,z
                    }
                }
            } 
        } = this.props;

        let i = 1;

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h4"> Data Sets Registers</Typography> 
                    <div className={classes.root}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >   
                                <p>{`Register Nº ${i++} from: ${dayjs(createdAt).format('h:mm a - MMMM DD YYYY')}`}</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={classes.heading}>
                                    
                                </Typography>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Portion</TableCell>
                                            <TableCell align="left">Color</TableCell>
                                            <TableCell align="left">Lights</TableCell>
                                            <TableCell align="left">Microphone</TableCell>
                                            <TableCell align="left">Speakers</TableCell>
                                            <TableCell align="left">Vibration</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell align="left">Midi</TableCell>
                                            <TableCell align="left">{color}</TableCell>
                                            <TableCell align="left">{lights.toString()}</TableCell>
                                            <TableCell align="left">{mic.toString()}</TableCell>
                                            <TableCell align="left">{speakers.toString()}</TableCell>
                                            <TableCell align="left">{vibration.toString()}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

export default (withStyles(styles)(DataSetHalo));
