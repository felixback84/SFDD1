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

class ContentRowChartResultsSelectedItemsLive extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
            arrCellsLive: []
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.top5TagListener){
            // set state
            // this.setState({ arrCellsLive: this.props.top5TagListener })
            // var to arr
            let arrFinalLive = []

            // top5Tag live promise
            const myPromiseLive = new Promise((resolve, reject)=>{
                console.log(`state comparasion: ${this.props.top5TagListener.length === this.props.lengthVendorsSelected}`)
                if(this.props.top5TagListener.length === this.props.lengthVendorsSelected){
                    this.props.top5TagListener.map((top5Tag)=>{
                        arrFinalLive.push({...top5Tag})
                    })
                    // print
                    console.log(`arrFinalLive: ${JSON.stringify(arrFinalLive)}`)
                    // promise resolve
                    resolve(arrFinalLive)
                }
            })  
            
            // live list of data for table
            myPromiseLive
                .then((data)=>{
                    this.setState({ arrCellsLive: data })
                })  
                .catch((err) => console.log('There was an error:' + err))
        }
    }

    render() {
        // styles
        const classes = this.props.classes

        return(
            <>
                {/* loop over top5Tags */}
                {
                    this.state.arrCellsLive.map((top5Tag) => (
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
                            {/* <TableCell classes={{ root: classes.tableCellRoot }}>
                                <SwitchToMarkFromModeOneToModeTwo
                                    thingid={top5Tag.thingId}
                                    docId={top5Tag.top5TagId}
                                />
                            </TableCell> */}

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
	top5TagListener:state.top5Tags1.top5TagListener,
    // thingLiveDataSetsListener:state.heartbeatThing1.thingLiveDataSetsListener
    idOfSpecificStaticDevices:state.heartbeatThing1.thingLiveDataSetsListener.idOfSpecificStaticDevices
});

export default connect(mapStateToProps)(withStyles(componentStyles)(ContentRowChartResultsSelectedItemsLive));


