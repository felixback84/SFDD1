import React, { Component } from 'react'
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
// components
import ColorMtsAvatar from "../../components/utils/ColorMtsAvatar"
import TagsMaker from "../../components/utils/TagsMaker"
import SwitchToMarkFromModeOneToModeTwo from '../../components/modeTwo/SwitchToMarkFromModeOneToModeTwo';
//import StaticDevicePropertyDetails from "./StaticDevicePropertyDetails"

// Redux stuff
import { connect } from 'react-redux';

// styles
import componentStyles from "assets/theme/views/admin/tables.js";

// table content component (child)
class ContentRowChartResultsSelectedItems extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
            arrCells: []
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.idOfSpecificStaticDevices){
            // promise
            const myPromise = new Promise((resolve, reject) => {
                // var to arr
                let arrFinal = []

                // print
                // console.log(`hi filter of selected ones: ${JSON.stringify(this.props.idofspecificstaticdevices)}`)
                console.log(`hi filter of selected ones: ${JSON.stringify(this.props.idOfSpecificStaticDevices)}`)

                // check if none static is selected
                if(this.props.idOfSpecificStaticDevices.length === 0){
                    arrFinal.push({...this.props.data[0]})
                } else if(this.props.idOfSpecificStaticDevices.length != 0) {
                    // loop over selection
                    this.props.idOfSpecificStaticDevices.map((id)=>{
                        // filter
                        this.props.data.filter((arrItem)=>{
                            // checker
                            if(arrItem.thingId === id.thingIdToSearch
                                    // && ids.length != 0
                                ){
                                    arrFinal.push({...arrItem})
                                } 
                        })	
                    })
                }
                // print
                console.log(`arrFinal: ${JSON.stringify(arrFinal)}`)
                // promise resolve
                resolve(arrFinal)
            })

            // list of data for table
            myPromise
                .then((data)=>{
                    // print
                    console.log(`top5Tag data after filter: ${JSON.stringify(data)}`)
                    // set state
                    this.setState({ arrCells: data });
                })
                .catch((err) => console.log('There was an error:' + err)) 
        }
    }

    render(){
        
        // styles
        const classes = this.props.classes
        
        // paint cells
        return(
            <>
                {/* loop over top5Tags */}
                {
                    this.state.arrCells.map((top5Tag) => (
                        // push it on arr
                        // arrCells.push(
                            <TableRow
                                key={top5Tag.thingId}
                            >	
                                {/* company meters range color and inicials */}
                                <TableCell
                                    classes={{
                                        root:
                                            classes.tableCellRoot +
                                            " " +
                                            classes.tableCellRootBodyHead,
                                    }}
                                    component="th"
                                    variant="head"
                                    scope="row"
                                >
                                    <Box alignItems="center" display="flex">
                                        <Box
                                            component={()=>{
                                                return(
                                                    <ColorMtsAvatar 
                                                        meters={top5Tag.meters} 
                                                        companyname={top5Tag.userCredentials.companyName}
                                                    />
                                                )
                                            }}
                                            marginRight="1rem"
                                            alt="..."
                                            // src={require("assets/img/theme/bootstrap.jpg").default}
                                        />
                                        <Box display="flex" alignItems="flex-start">
                                            <Box fontSize=".875rem" component="span">
                                                {top5Tag.userCredentials.companyName}
                                            </Box>
                                        </Box>
                                    </Box>
                                </TableCell>
                                
                                {/* tags */}
                                <TableCell classes={{ root: classes.tableCellRoot }}>
                                    <TagsMaker data={top5Tag.matchDataResults}/>
                                </TableCell>
                                
                                {/* Vendor Details */}
                                <TableCell classes={{ root: classes.tableCellRoot }}>
                                    <Box paddingTop=".35rem" paddingBottom=".35rem">
                                        {/* <StaticDevicePropertyDetails
                                            top5tagid={top5Tag.top5TagId}
                                            thingid={top5Tag.thingId}
                                        /> */}
                                    </Box>
                                </TableCell>
                                
                                {/* avatar */}
                                <TableCell classes={{ root: classes.tableCellRoot }}>
                                    <Tooltip title="Ryan Tompson" placement="top">
                                        <Avatar
                                            classes={{ root: classes.avatarRoot }}
                                            alt="..."
                                            src={
                                                require("assets/img/theme/team-1-800x800.jpg").default
                                            }
                                        />
                                    </Tooltip>
                                </TableCell>

                                {/* switcher marker */}
                                <TableCell classes={{ root: classes.tableCellRoot }}>
                                    <SwitchToMarkFromModeOneToModeTwo
                                        thingid={top5Tag.thingId}
                                        docId={top5Tag.top5TagId}
                                    />
                                </TableCell>

                                {/* meters from you */}
                                <TableCell classes={{ root: classes.tableCellRoot }}>
                                    <Box display="flex" alignItems="center">
                                        <Box component="span" marginRight=".5rem">
                                            {top5Tag.meters.toFixed(2)} Meters
                                        </Box>
                                        <Box width="100%">
                                            <LinearProgress
                                                variant="determinate"
                                                value={top5Tag.meters}
                                                classes={{
                                                    root: classes.linearProgressRoot,
                                                    bar: classes.bgGradientError,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        // )
                    ))
                }
            </>
        )
    }			
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// top5Tags
	// loading:state.top5Tags1.loading,
	// top5Tags:state.top5Tags1.top5Tags,
    // thingLiveDataSetsListener:state.heartbeatThing1.thingLiveDataSetsListener
    idOfSpecificStaticDevices:state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificStaticDevices
});

export default connect(mapStateToProps)(withStyles(componentStyles)(ContentRowChartResultsSelectedItems));
// export default (withStyles(componentStyles)(ContentRowChartResultsSelectedItems))
