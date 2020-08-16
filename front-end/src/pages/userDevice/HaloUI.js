import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';

// Redux stuff
import { connect } from 'react-redux';
import { haloThingSyncDataWithDB } from '../../redux/actions/haloUIActions';

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
        this.props.haloThingSyncDataWithDB('CarlosTal84-Halo-8n4ohAo247H1W5SsxY9s');
    } 

    render(){ 
        // props
        const {classes, data} = this.props;
        //  print
        console.log(`data from db for halo: ${data}`);
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
export default connect(mapStateToProps,{haloThingSyncDataWithDB})(withStyles(styles)(HaloUI));