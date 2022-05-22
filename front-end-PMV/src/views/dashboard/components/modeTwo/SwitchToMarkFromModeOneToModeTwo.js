import React,{Component} from 'react'
// mui
import Switch from '@material-ui/core/Switch';
// redux
import { connect } from 'react-redux'
import { selectStaticDevicesToSearch,unSelectStaticDevicesToSearch } from '../../../../redux/actions/heartbeatUIActions'
// import { saveTop5TagIdInReducer } from ''
import { 
    userDeviceSpecificTop5TagSyncDataStatic,
    userDeviceSpecificTop5TagSyncDataLiveDB,
} from '../../../../redux/actions/top5TagsActions'

class SwitchToMarkFromModeOneToModeTwo extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
            checked:false,
            ids:[]
        }
    }

    // method switcher
    handleChange = (event,ids) => {
        // event
        this.setState({ ...this.state, [event.target.name]: event.target.checked })
        // var to hold data from reducer
        const thingIdToSearch = this.props.thingid
        const thingId = this.props.thingLiveDataSets.thingId
        const top5TagDocId = this.props.docId
        // var
        const objSelectProfileToSearch = {
            thingIdToSearch,
            thingId,
            top5TagDocId
        }
        // check if is an union or a deletion
        if(ids.length >= 0){
            // to post and update list on liveDataSets
            this.props.selectStaticDevicesToSearch({objSelectProfileToSearch})
        } 
    }

    // passing changes props
    componentWillReceiveProps(nextProps){
        if(nextProps.idOfSpecificStaticDevices){ 
            this.setState({
                ids:this.props.idOfSpecificStaticDevices
            })
            // top5Tag static data
            this.props.userDeviceSpecificTop5TagSyncDataStatic(
                this.props.thingLiveDataSets.thingId,
                this.props.idOfSpecificStaticDevices
            )
            // live data from top5Tag
            this.props.userDeviceSpecificTop5TagSyncDataLiveDB(
                this.props.thingLiveDataSets.thingId,
                this.props.idOfSpecificStaticDevices
            )
            
            // print
            console.log(`this.props.idOfSpecificStaticDevices: ${JSON.stringify(this.props.idOfSpecificStaticDevices)}`)
        }
    }    

    render() {
        
        return (
            <Switch
                checked={this.state.checked}
                onChange={(e)=>{
                    this.handleChange(e,this.state.ids)
                }}
                name="checked"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    //liveDataSets
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
    thingLiveDataSetsListener: state.heartbeatThing1.thingLiveDataSetsListener,
    idOfSpecificStaticDevices: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificStaticDevices
});

export default connect(mapStateToProps,{
    selectStaticDevicesToSearch,
    unSelectStaticDevicesToSearch,
    userDeviceSpecificTop5TagSyncDataStatic,
    userDeviceSpecificTop5TagSyncDataLiveDB
})(SwitchToMarkFromModeOneToModeTwo);
