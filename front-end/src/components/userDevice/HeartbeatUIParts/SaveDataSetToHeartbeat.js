import React, { Component } from 'react'
// mui stuff
import Button from '@material-ui/core/Button';
// redux stuff
import { connect } from 'react-redux';
import { postInDataSetsUserDevice } from '../../../redux/actions/dataSetsActions';

// rcc to save data in dataSets
class SaveDataSetToHilda extends Component {

    // redux action trigger
    handleSubmit = (event) => {
        event.preventDefault();
        // userDeviceId
        const { userdeviceid } = this.props;
        // data of thing
        const { thingLiveDataSets } = this.props;
        // redux post action
        this.props.postInDataSetsUserDevice(userdeviceid, thingLiveDataSets);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Button 
                    variant="outlined" 
                    color="secondary"
                    type="submit"
                >
                    Save Data Set
                </Button>
            </form>
        )
    }
}

// redux state
const mapStateToProps = (state) => ({
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets
})

export default connect(mapStateToProps,{postInDataSetsUserDevice})(SaveDataSetToHilda);



