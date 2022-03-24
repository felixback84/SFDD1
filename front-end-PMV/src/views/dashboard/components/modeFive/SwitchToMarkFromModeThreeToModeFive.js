
import React,{Component} from 'react'
// mui
import Switch from '@material-ui/core/Switch';
// redux
import { connect } from 'react-redux'
import { selectProductOfStaticDeviceToSearchByUserDevice } from '../../../../redux/actions/heartbeatUIActions'
import { 
    userDeviceSpecificTop5ProductSyncData,
    userDeviceSpecificTop5ProductSyncDataLiveDB,
} from '../../../../redux/actions/top5ProductsActions'

class SwitchToMarkFromModeThreeToModeFive extends Component {

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
        const top5ProductDocId = this.props.docId
        // var to send
        const objSelectProfileToSearch = {
            thingIdToSearch,
            thingId,
            top5ProductDocId
        }
        // check if is an union or a deletion
        if(ids.length >= 0){
            // to post and update list on liveDataSets
            this.props.selectProductOfStaticDeviceToSearchByUserDevice({objSelectProfileToSearch})
        } 
    } 

    // passing changes props
    componentWillReceiveProps(nextProps){
        if(nextProps.idOfSpecificProducts){
            this.setState({
                ids:nextProps.idOfSpecificProducts
            })
            // top5Product static data
            this.props.userDeviceSpecificTop5ProductSyncData(
                this.props.thingLiveDataSets.thingId,
                nextProps.idOfSpecificProducts
            )
            // live data from top5Product
            this.props.userDeviceSpecificTop5ProductSyncDataLiveDB(
                this.props.thingLiveDataSets.thingId,
                nextProps.idOfSpecificProducts
            )
            // print
            console.log(`this.props.idOfSpecificProducts: ${JSON.stringify(nextProps.idOfSpecificProducts)}`)
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
    idOfSpecificProducts: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificProducts
}) 

export default connect(mapStateToProps,{
    // thingLiveDataSets
    selectProductOfStaticDeviceToSearchByUserDevice,
    // top5Products
    userDeviceSpecificTop5ProductSyncData,
    userDeviceSpecificTop5ProductSyncDataLiveDB
})(SwitchToMarkFromModeThreeToModeFive)







