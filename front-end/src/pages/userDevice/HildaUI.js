import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';

// Redux stuff
import { connect } from 'react-redux';
import { hildaThingSyncDataWithLiveDB } from '../../redux/actions/hildaUIActions';
import { getUserDevice } from '../../redux/actions/userDevicesActions';

// style
const styles = (theme) => ({
    root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
})

class HildaUI extends Component {
    //redux action
    componentWillMount(){
        this.props.getUserDevice(this.props.userdeviceid);
        this.props.hildaThingSyncDataWithLiveDB(this.props.userdeviceid);
    } 

    render(){ 
        // props
        const {classes, data} = this.props;
        //  print
        console.log(`data from db for halo: ${data}`);
        return (
            <div className={classes.root}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>Four</Button>
                    <Button>Five</Button>
                    <Button>Six</Button>
                </ButtonGroup>
            </div>
        );
    }
}

// redux state
const mapStateToProps = (state) => ({
    data: state.hildaThing1.data
})
//export default Device;
export default connect(mapStateToProps,{hildaThingSyncDataWithLiveDB, getUserDevice})(withStyles(styles)(HildaUI));