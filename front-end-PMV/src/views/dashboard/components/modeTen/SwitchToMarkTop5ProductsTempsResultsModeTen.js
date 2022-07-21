import React,{Component} from 'react'
// mui
import Switch from '@material-ui/core/Switch';
// redux
import { connect } from 'react-redux'
import { 
    postListOfTop5ProductsInUserDeviceDocAfterPriceRangeAndCategoryMatch,
    userDeviceTop5ProductsSyncDataStatic,
    userDeviceTop5ProductsSyncDataLiveDB,
} from '../../../../redux/actions/top5ProductsActions'

class SwitchToMarkTop5ProductsTempsResultsModeTen extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
            checked:false,
            firstDataPackage:true,
            espCounter:0,
        }   
    }

    // method switcher
    handleChange = () => { 
        // data to send to api route
        let data = {}
        // check if is the first record send
        if(this.state.firstDataPackage === true){
            // data 
            data = {
                thingId:this.props.thingLiveDataSets.thingId,
                espCounter:this.state.espCounter,
                resultListSearch:[{
                    product:this.props.dataIdProducts.product,
                    meters:this.props.dataIdProducts.meters,
                    companyData:this.props.dataIdProducts.companyData
                }]
            }
            // print
            console.log({data})
            // redux action
            this.props.postListOfTop5ProductsInUserDeviceDocAfterPriceRangeAndCategoryMatch(data)
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
            this.props.postListOfTop5ProductsInUserDeviceDocAfterPriceRangeAndCategoryMatch(data)
        }
    }  

    // passing changes props
    componentWillReceiveProps(nextProps){
        // check if exists any changes in this arr
        if(nextProps.idOfSpecificProducts){ 
            // static data from top5Tags
			this.props.userDeviceTop5ProductsSyncDataStatic(this.props.thingLiveDataSets.thingId)
			// props.userDeviceSpecificTop5ProductSyncData(thingId,arrIds)	
			// live data from top5Tags
			this.props.userDeviceTop5ProductsSyncDataLiveDB(this.props.thingLiveDataSets.thingId)
			// props.userDeviceSpecificTop5ProductSyncDataLiveDB(thingId,arrIds) 
            // print
            // console.log(`this.state.ids: ${JSON.stringify(this.state.ids)}`)
        } else {
            console.log("no changes yet in idOfSpecificProducts")
        }
    }  

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
    idOfSpecificProducts: state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificProducts,
    // top5Products
    responsesWithData:state.top5Products1.responsesWithData,
});

export default connect(mapStateToProps,{
    postListOfTop5ProductsInUserDeviceDocAfterPriceRangeAndCategoryMatch,
    userDeviceTop5ProductsSyncDataStatic,
    userDeviceTop5ProductsSyncDataLiveDB,
})(SwitchToMarkTop5ProductsTempsResultsModeTen);
