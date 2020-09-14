import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';

// Redux stuff
import { connect } from 'react-redux';
import { haloThingSyncDataWithLiveDB } from '../../../redux/actions/haloUIActions';

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

class HaloUI extends Component {
    //redux action
    componentWillMount(){
        const thingId = this.props.thingid;
        this.props.haloThingSyncDataWithLiveDB(thingId);
    } 
 
    render(){  
        // props
        const {classes, data} = this.props;
        return (
            <div className={classes.root}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup>
            </div>
        );
    }
}

// redux state
const mapStateToProps = (state) => ({
    data: state.haloThing1.data
})
//export default Device;
export default connect(mapStateToProps,{haloThingSyncDataWithLiveDB})(withStyles(styles)(HaloUI));