import React,{Component} from 'react'
// mui
import Switch from '@material-ui/core/Switch';
// redux
import { connect } from 'react-redux'
//import { selectStaticDevicesToSearch,unSelectStaticDevicesToSearch } from '../../../../redux/actions/heartbeatUIActions'
// import { saveTop5TagIdInReducer } from ''
import { 
    // userDeviceSpecificTop5TagSyncDataStatic,
    userDeviceSpecificTop5TagSyncDataLiveDB,
    postListOfTop5TagsInUserDeviceDoc
} from '../../../../redux/actions/top5TagsActions'

class SwitchToMarkTop5TagsTempsResultsModeSeven extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
            checked:false,
            firstDataPackage:true,
            espCounter:0,
            ids:[]
        }   
    }

    // method switcher
    handleChange = () => {
        // var to hold data from reducer
        const thingIdStaticDevice = this.props.thingIdStaticDevice
        const thingIdUserDevice = this.props.thingLiveDataSets.thingId
        // data to send to api route
        let data = {}
        // check if is the first record send
        if(this.state.firstDataPackage === true){
            // data 
            data = {
                espCounter:0,
                resultListSearch:{
                    thingId:thingIdUserDevice,
                    staticDevicesId:thingIdStaticDevice,
                    meters:this.props.meters
                }
            }
            // redux action
            this.props.postListOfTop5TagsInUserDeviceDoc(data)
            // var to pas in setState
            const hiNewSelection = (prevState)=>({
                espCounter:prevState.espCounter + 1,
                checked:true,  
                firstDataPackage:false,
            })
            // change state
            this.setState(
                hiNewSelection,()=>{
                    data.espCounter = this.state.espCounter
                    // print
                    console.log(`state:${JSON.stringify(this.state)}`)
                    console.log(`data one:${JSON.stringify(data)}`)
                }
            )
        } else if(this.state.firstDataPackage === false){
            // print
            console.log(`data two:${JSON.stringify(data)}`)
            // redux action
            this.props.postListOfTop5TagsInUserDeviceDoc(data)
        }
    }  

    // passing changes props
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.idOfSpecificStaticDevices){ 
    //         this.setState({
    //             ids:this.props.idOfSpecificStaticDevices
    //         })
    //         // live data from top5Tag
    //         this.props.userDeviceSpecificTop5TagSyncDataLiveDB(
    //             this.props.thingLiveDataSets.thingId
    //             ,this.props.idOfSpecificStaticDevices
    //         )
            
    //         // print
    //         console.log(`this.props.idOfSpecificStaticDevices: ${JSON.stringify(this.props.idOfSpecificStaticDevices)}`)
    //     }
    // }  

    render() {
        
        return (
            <Switch
                checked={this.state.checked}
                onChange={()=>{
                    this.handleChange()
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
    idOfSpecificStaticDevices: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificStaticDevices,
});

export default connect(mapStateToProps,{
    postListOfTop5TagsInUserDeviceDoc,
    //userDeviceSpecificTop5TagSyncDataStatic,
    userDeviceSpecificTop5TagSyncDataLiveDB,
})(SwitchToMarkTop5TagsTempsResultsModeSeven);
